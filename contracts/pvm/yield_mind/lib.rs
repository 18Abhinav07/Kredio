#![cfg_attr(not(feature = "std"), no_std, no_main)]

use parity_scale_codec::{Decode, Encode};
use scale_info::TypeInfo;
use ink::primitives::Address;

#[derive(Encode, Decode, TypeInfo, Default, Clone, Copy)]
pub struct AllocationDecision {
    pub conservative_bps:  u32,
    pub balanced_bps:      u32,
    pub aggressive_bps:    u32,
    pub idle_bps:          u32,
    pub projected_apy_bps: u32,
    pub confidence:        u8,
    pub reasoning_code:    u8, // 0=Normal 1=HighUtil 2=LowUtil 3=Volatile
}

#[ink::contract]
mod yield_mind {
    use super::*;

    #[ink(storage)]
    pub struct YieldMind {
        conservative_apy_bps: u32, // default 650  (6.5% APY)
        balanced_apy_bps:     u32, // default 1100 (11.0% APY)
        aggressive_apy_bps:   u32, // default 1800 (18.0% APY)
        owner:                Address,
    }

    #[ink(event)]
    pub struct AllocationComputed {
        utilization_bps:  u32,
        conservative_bps: u32,
        balanced_bps:     u32,
        aggressive_bps:   u32,
        idle_bps:         u32,
        projected_apy_bps: u32,
        reasoning_code:   u8,
    }

    impl YieldMind {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                conservative_apy_bps: 650,
                balanced_apy_bps:     1_100,
                aggressive_apy_bps:   1_800,
                owner:                Self::env().caller(),
            }
        }

        /// Compute optimal idle capital allocation. Emits AllocationComputed.
        ///
        /// reasoning_code:  0=Normal  1=HighUtil (>70%)  2=LowUtil (<20%)  3=Volatile
        #[ink(message)]
        pub fn compute_allocation(
            &mut self,
            total_deposited:         u64,
            total_borrowed:          u64,
            _strategy_balance:       u64,
            avg_credit_score:        u8,
            volatility_bps:          u32,
            blocks_since_rebalance:  u32,
        ) -> AllocationDecision {
            // Guard: nothing to allocate
            if total_deposited == 0 {
                self.env().emit_event(AllocationComputed {
                    utilization_bps:  0,
                    conservative_bps: 0,
                    balanced_bps:     0,
                    aggressive_bps:   0,
                    idle_bps:         10_000,
                    projected_apy_bps: 0,
                    reasoning_code:   0,
                });
                return AllocationDecision {
                    idle_bps: 10_000,
                    ..Default::default()
                };
            }

            // Utilisation in basis points - u128 intermediate
            let util_bps = ((total_borrowed as u128 * 10_000)
                / total_deposited as u128) as u32;

            // ── Reasoning code (priority order) ──────────────────────────
            let reasoning_code: u8 = if util_bps > 7_000 {
                1 // HighUtil - keep everything liquid
            } else if volatility_bps > 3_000 {
                3 // Volatile
            } else if util_bps < 2_000 {
                2 // LowUtil
            } else {
                0 // Normal
            };

            // ── Allocation per reasoning code ─────────────────────────────
            let (conservative_bps, balanced_bps, aggressive_bps): (u32, u32, u32) =
                match reasoning_code {
                    1 => (0, 0, 0), // HighUtil: everything idle

                    3 => (1_500, 0, 0), // Volatile: only conservative bucket

                    2 => {
                        // LowUtil: quadratic curve
                        // factor = (2000 - util_bps) in range [0, 2000]
                        // total_deploy = factor² / 2000² × 4000  (max 4000 bps)
                        let threshold: u32 = 2_000;
                        let factor = threshold - util_bps; // util_bps < threshold guaranteed
                        let factor_sq    = (factor    as u64) * (factor    as u64);
                        let threshold_sq = (threshold as u64) * (threshold as u64);
                        let total_deploy = ((factor_sq * 4_000) / threshold_sq) as u32;
                        (
                            total_deploy * 40 / 100,
                            total_deploy * 40 / 100,
                            total_deploy * 20 / 100,
                        )
                    }

                    _ => {
                        // Normal: credit quality scaled
                        // deploy 2000 bps at score=0, 4000 bps at score=100
                        let total_deploy =
                            (2_000_u32 + avg_credit_score as u32 * 20).min(5_000);
                        (
                            total_deploy * 40 / 100,
                            total_deploy * 40 / 100,
                            total_deploy * 20 / 100,
                        )
                    }
                };

            // Invariant: conservative + balanced + aggressive + idle = exactly 10_000
            let idle_bps = 10_000_u32
                .saturating_sub(conservative_bps)
                .saturating_sub(balanced_bps)
                .saturating_sub(aggressive_bps);

            // ── Projected APY ─────────────────────────────────────────────
            let projected_apy_bps = (conservative_bps * self.conservative_apy_bps
                + balanced_bps     * self.balanced_apy_bps
                + aggressive_bps   * self.aggressive_apy_bps)
                / 10_000;

            // ── Confidence ────────────────────────────────────────────────
            let confidence: u8 = if blocks_since_rebalance < 50 {
                60
            } else if blocks_since_rebalance < 300 {
                80
            } else {
                95
            };

            self.env().emit_event(AllocationComputed {
                utilization_bps: util_bps,
                conservative_bps,
                balanced_bps,
                aggressive_bps,
                idle_bps,
                projected_apy_bps,
                reasoning_code,
            });

            AllocationDecision {
                conservative_bps,
                balanced_bps,
                aggressive_bps,
                idle_bps,
                projected_apy_bps,
                confidence,
                reasoning_code,
            }
        }

        /// Update APY configuration values. Owner only.
        #[ink(message)]
        pub fn update_apys(&mut self, conservative: u32, balanced: u32, aggressive: u32) {
            assert!(self.env().caller() == self.owner, "not owner");
            self.conservative_apy_bps = conservative;
            self.balanced_apy_bps     = balanced;
            self.aggressive_apy_bps   = aggressive;
        }

        #[ink(message)]
        pub fn owner(&self) -> Address { self.owner }

        #[ink(message)]
        pub fn apys(&self) -> (u32, u32, u32) {
            (self.conservative_apy_bps, self.balanced_apy_bps, self.aggressive_apy_bps)
        }
    }
}
