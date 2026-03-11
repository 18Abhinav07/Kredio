#![cfg_attr(not(feature = "std"), no_std, no_main)]

use parity_scale_codec::{Decode, Encode};
use scale_info::TypeInfo;
use ink::primitives::Address;

#[derive(Encode, Decode, TypeInfo, Default, Clone, Copy)]
pub struct PositionRisk {
    pub liquidation_probability_pct: u8,
    pub estimated_blocks_to_liq:     u32,
    pub risk_tier:                   u8,
    pub collateral_buffer_bps:       u32,
    pub recommended_top_up_atoms:    u64,
}

#[ink::contract]
mod risk_assessor {
    use super::*;

    #[ink(storage)]
    pub struct RiskAssessor {
        owner: Address,
    }

    #[ink(event)]
    pub struct RiskAssessed {
        #[ink(topic)]
        borrower:      [u8; 20],
        risk_tier:     u8,
        liq_prob:      u8,
        buffer_bps:    u32,
        blocks_to_liq: u32,
    }

    impl RiskAssessor {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self { owner: Self::env().caller() }
        }

        /// Assess a single borrower position and emit RiskAssessed.
        #[ink(message)]
        pub fn assess_position(
            &mut self,
            borrower:             [u8; 20],
            collateral_usd_x6:    u64,
            debt_usd_x6:          u64,
            credit_score:         u8,
            price_7d_change_bps:  i32,
            liq_ratio_bps:        u32,
        ) -> PositionRisk {
            let r = Self::compute_risk(
                collateral_usd_x6,
                debt_usd_x6,
                credit_score,
                price_7d_change_bps,
                liq_ratio_bps,
            );
            self.env().emit_event(RiskAssessed {
                borrower,
                risk_tier:     r.risk_tier,
                liq_prob:      r.liquidation_probability_pct,
                buffer_bps:    r.collateral_buffer_bps,
                blocks_to_liq: r.estimated_blocks_to_liq,
            });
            r
        }

        /// Assess up to 16 positions in one transaction.
        /// Only entries [0..active_count) are real - the rest return zero-value.
        /// Emits RiskAssessed only for active entries.
        #[ink(message)]
        pub fn assess_batch(
            &mut self,
            borrowers:    [[u8; 20]; 16],
            collaterals:  [u64; 16],
            debts:        [u64; 16],
            scores:       [u8; 16],
            price_change: i32,
            liq_ratio:    u32,
            active_count: u8,
        ) -> [PositionRisk; 16] {
            let count = (active_count as usize).min(16);
            let mut results = [PositionRisk::default(); 16];
            for i in 0..count {
                let r = Self::compute_risk(
                    collaterals[i],
                    debts[i],
                    scores[i],
                    price_change,
                    liq_ratio,
                );
                self.env().emit_event(RiskAssessed {
                    borrower:      borrowers[i],
                    risk_tier:     r.risk_tier,
                    liq_prob:      r.liquidation_probability_pct,
                    buffer_bps:    r.collateral_buffer_bps,
                    blocks_to_liq: r.estimated_blocks_to_liq,
                });
                results[i] = r;
            }
            results
        }

        #[ink(message)]
        pub fn owner(&self) -> Address { self.owner }

        // ── Pure computation - no state access ───────────────────────────

        fn compute_risk(
            collateral_usd_x6:   u64,
            debt_usd_x6:         u64,
            credit_score:        u8,
            price_7d_change_bps: i32,
            liq_ratio_bps:       u32,
        ) -> PositionRisk {
            // Guard: zero debt = fully safe
            if debt_usd_x6 == 0 {
                return PositionRisk {
                    liquidation_probability_pct: 0,
                    estimated_blocks_to_liq:     999_999,
                    risk_tier:                   0,
                    collateral_buffer_bps:        99_999,
                    recommended_top_up_atoms:    0,
                };
            }

            // Health ratio in basis points - u128 intermediate prevents overflow
            // (max collateral_usd_x6 ≈ 10^15; × 10_000 = 10^19 < u128::MAX ~3.4×10^38)
            let health_bps = ((collateral_usd_x6 as u128 * 10_000)
                / debt_usd_x6 as u128) as u32;
            let buffer_bps = health_bps.saturating_sub(liq_ratio_bps);

            // ── Base probability ──────────────────────────────────────────
            let base_prob: i32 = if health_bps < liq_ratio_bps || buffer_bps == 0 {
                100
            } else if buffer_bps < 500 {
                90
            } else if buffer_bps < 1_000 {
                70
            } else if buffer_bps < 2_000 {
                45
            } else if buffer_bps < 5_000 {
                20
            } else {
                5
            };

            // ── Price trend adjustment ────────────────────────────────────
            let trend_adj: i32 = if price_7d_change_bps < -1_000 {
                25
            } else if price_7d_change_bps < -500 {
                15
            } else if price_7d_change_bps < 0 {
                5
            } else if price_7d_change_bps > 1_000 {
                -15
            } else if price_7d_change_bps > 500 {
                -10
            } else {
                0
            };

            // ── Credit score adjustment ───────────────────────────────────
            let score_adj: i32 = if credit_score >= 65 {
                -10
            } else if credit_score >= 30 {
                -5
            } else if credit_score < 15 {
                5
            } else {
                0
            };

            let liq_prob = (base_prob + trend_adj + score_adj).clamp(0, 100) as u8;

            // ── Risk tier ─────────────────────────────────────────────────
            let risk_tier: u8 = if liq_prob <= 15 {
                0 // SAFE
            } else if liq_prob <= 40 {
                1 // WATCH
            } else if liq_prob <= 70 {
                2 // WARNING
            } else {
                3 // CRITICAL
            };

            // ── Blocks to liquidation (only when price is falling) ────────
            let blocks_to_liq: u32 = if price_7d_change_bps >= 0 {
                999_999
            } else {
                let rate_bps_per_block = (-price_7d_change_bps as u32) / 100_800;
                if rate_bps_per_block == 0 {
                    999_999
                } else {
                    buffer_bps / rate_bps_per_block
                }
            };

            // ── Recommended top-up ────────────────────────────────────────
            let target_health_bps    = (liq_ratio_bps + 5_000) + liq_ratio_bps;
            let target_collateral_x6 = (debt_usd_x6 as u128
                * target_health_bps as u128
                / 10_000) as u64;
            let recommended_top_up_atoms = if target_collateral_x6 > collateral_usd_x6 {
                target_collateral_x6 - collateral_usd_x6
            } else {
                0
            };

            PositionRisk {
                liquidation_probability_pct: liq_prob,
                estimated_blocks_to_liq:     blocks_to_liq,
                risk_tier,
                collateral_buffer_bps:        buffer_bps,
                recommended_top_up_atoms,
            }
        }
    }
}
