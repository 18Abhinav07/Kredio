#![cfg_attr(not(feature = "std"), no_std, no_main)]

use ink::primitives::Address;

#[ink::contract]
mod neural_scorer {

    const SCALE: u64 = 1_000_000;

    #[ink(storage)]
    pub struct NeuralScorer {
        version: u32,
        owner:   Address,
    }

    #[ink(event)]
    pub struct ScoreInferred {
        #[ink(topic)]
        account:            [u8; 20],
        neural_score:       u8,
        deterministic_score: u8,
        confidence_pct:     u8,
        delta_from_rule:    i8,
        model_version:      u32,
    }

    impl NeuralScorer {
        /// Deploy with default calibrated weights.
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                version: 1,
                owner:   Self::env().caller(),
            }
        }

        #[ink(message)]
        pub fn infer(
            &mut self,
            account:             [u8; 20],
            repayment_count:     u32,
            liquidation_count:   u32,
            deposit_tier:        u8,
            age_blocks:          u32,
            deterministic_score: u8,
        ) -> u8 {
            // Normalise each input to [0, SCALE] using unsigned arithmetic
            let rep_norm = (repayment_count  as u64).min(20)          * SCALE / 20;
            let liq_norm = (liquidation_count as u64).min(5)          * SCALE / 5;
            let dep_norm = (deposit_tier      as u64)                  * SCALE / 7;
            let age_norm = (age_blocks        as u64).min(2_628_000)   * SCALE / 2_628_000;

            // Positive signals: repayment (4x), deposit (2x), age (1x)   range [0, 7M]
            let pos = rep_norm * 4 + dep_norm * 2 + age_norm;
            // Negative signal: liquidation (4x) - subtract safely
            let neg = liq_norm * 4;
            // Combined: pos - neg + 0 to get a value in [0, 7M], bias by adding
            // 4M so the range becomes [0−4M fall, +7M rise]; clamp to [0, 11M]
            let score_raw = if pos + 4_000_000 > neg {
                (pos + 4_000_000 - neg).min(11_000_000)
            } else {
                0u64
            };
            let neural_score = (score_raw * 100 / 11_000_000).min(100) as u8;

            let det = deterministic_score as u32;
            let nn  = neural_score as u32;
            let delta_from_rule: i8 = if nn >= det {
                (nn - det).min(127) as i8
            } else {
                -((det - nn).min(128) as i8)
            };
            let mid_diff = if nn >= 50 { nn - 50 } else { 50 - nn };
            let confidence_pct = (mid_diff * 2).min(100) as u8;

            self.env().emit_event(ScoreInferred {
                account,
                neural_score,
                deterministic_score,
                confidence_pct,
                delta_from_rule,
                model_version: self.version,
            });

            neural_score
        }

        #[ink(message)]
        pub fn version(&self) -> u32 { self.version }

        #[ink(message)]
        pub fn owner(&self) -> Address { self.owner }
    }
}
