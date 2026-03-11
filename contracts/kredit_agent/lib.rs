#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod kredit_agent {

    #[ink(storage)]
    pub struct KreditAgent {}

    impl KreditAgent {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {}
        }

        /// compute_score(repayments, liquidations, deposit_tier, blocks_since_first) → u64
        ///
        /// Component weights:
        ///   Repayment history  - max 55 pts (with liquidation penalty)
        ///   Lending volume     - max 35 pts (via deposit_tier 0–7)
        ///   Account age        - max 10 pts (via blocks_since_first)
        ///   TOTAL max          = 100 pts
        #[ink(message)]
        pub fn compute_score(
            &self,
            repayments: u64,
            liquidations: u64,
            deposit_tier: u64,
            blocks_since_first: u64,
        ) -> u64 {
            let repayment = Self::repayment_points(repayments, liquidations);
            let deposit = Self::deposit_points(deposit_tier);
            let age = Self::age_points(blocks_since_first);
            let total = repayment
                .saturating_add(deposit)
                .saturating_add(age);
            total.min(100)
        }

        /// collateral_ratio(score) → u64 (basis points)
        #[ink(message)]
        pub fn collateral_ratio(&self, score: u64) -> u64 {
            Self::collateral_ratio_internal(score)
        }

        /// interest_rate(score) → u64 (basis points)
        #[ink(message)]
        pub fn interest_rate(&self, score: u64) -> u64 {
            Self::interest_rate_internal(score)
        }

        /// tier(score) → u8
        #[ink(message)]
        pub fn tier(&self, score: u64) -> u8 {
            Self::tier_from_score(score)
        }

        /// reasoning(repayments, liquidations, deposit_tier, blocks_since_first, score) → [u8; 256]
        #[ink(message)]
        pub fn reasoning(
            &self,
            repayments: u64,
            liquidations: u64,
            deposit_tier: u64,
            blocks_since_first: u64,
            score: u64,
        ) -> [u8; 256] {
            let mut buffer = [b' '; 256];
            let mut cursor = 0usize;

            let repayment_pts = Self::repayment_points(repayments, liquidations);
            let deposit_pts = Self::deposit_points(deposit_tier);
            let age_pts = Self::age_points(blocks_since_first);

            let tier_value = Self::tier_from_score(score);
            let tier_label = Self::tier_label(tier_value);

            Self::push_literal(&mut buffer, &mut cursor, b"Repayment:");
            Self::push_number(&mut buffer, &mut cursor, repayment_pts);
            Self::push_literal(&mut buffer, &mut cursor, b"pts(");
            Self::push_number(&mut buffer, &mut cursor, repayments);
            Self::push_literal(&mut buffer, &mut cursor, b"rep,");
            Self::push_number(&mut buffer, &mut cursor, liquidations);
            Self::push_literal(&mut buffer, &mut cursor, b"liq). Deposit:");
            Self::push_number(&mut buffer, &mut cursor, deposit_pts);
            Self::push_literal(&mut buffer, &mut cursor, b"pts(tier");
            Self::push_number(&mut buffer, &mut cursor, deposit_tier);
            Self::push_literal(&mut buffer, &mut cursor, b"). Age:");
            Self::push_number(&mut buffer, &mut cursor, age_pts);
            Self::push_literal(&mut buffer, &mut cursor, b"pts. Score:");
            Self::push_number(&mut buffer, &mut cursor, score);
            Self::push_literal(&mut buffer, &mut cursor, b"/100. Tier:");
            Self::push_literal(&mut buffer, &mut cursor, tier_label);
            Self::push_literal(&mut buffer, &mut cursor, b".");

            buffer
        }

        fn repayment_points(repayments: u64, liquidations: u64) -> u64 {
            let base: u64 = if repayments >= 12 {
                55
            } else if repayments >= 8 {
                46
            } else if repayments >= 5 {
                36
            } else if repayments >= 3 {
                26
            } else if repayments >= 2 {
                16
            } else if repayments >= 1 {
                8
            } else {
                0
            };

            let penalty: u64 = if liquidations >= 3 {
                55
            } else if liquidations >= 2 {
                35
            } else if liquidations >= 1 {
                20
            } else {
                0
            };

            base.saturating_sub(penalty)
        }

        fn deposit_points(deposit_tier: u64) -> u64 {
            match deposit_tier {
                7 => 35,
                6 => 30,
                5 => 25,
                4 => 20,
                3 => 15,
                2 => 10,
                1 =>  5,
                _ =>  0,
            }
        }

        fn age_points(blocks_since_first: u64) -> u64 {
            if blocks_since_first >= 10_000 {
                10
            } else if blocks_since_first >= 2_000 {
                5
            } else if blocks_since_first >= 500 {
                2
            } else {
                0
            }
        }

        fn collateral_ratio_internal(score: u64) -> u64 {
            // Returns collateral ratio in BPS (e.g. 11765 = 115% collateral for 85% LTV)
            // Inverse of LTV: collateral_ratio = 10000 * 10000 / ltv_bps
            let ltv_bps: u64 = if score >= 80 {
                8500 // 85% LTV
            } else if score >= 65 {
                7500 // 75% LTV
            } else if score >= 50 {
                6500 // 65% LTV
            } else if score >= 30 {
                5500 // 55% LTV
            } else if score >= 15 {
                4200 // 42% LTV
            } else {
                3000 // 30% LTV
            };
            // Return as collateral ratio BPS: (10000 * 10000) / ltv_bps
            // For KredioLending which expects collateralRatioBps as collateral/borrow ratio
            100_000_000u64 / ltv_bps
        }

        fn interest_rate_internal(score: u64) -> u64 {
            if score >= 80 {
                300  // 3% APY - DIAMOND
            } else if score >= 65 {
                600  // 6% APY - PLATINUM
            } else if score >= 50 {
                1000 // 10% APY - GOLD
            } else if score >= 30 {
                1500 // 15% APY - SILVER
            } else if score >= 15 {
                1800 // 18% APY - BRONZE
            } else {
                2200 // 22% APY - ANON
            }
        }

        fn tier_from_score(score: u64) -> u8 {
            if score >= 80 {
                5 // DIAMOND
            } else if score >= 65 {
                4 // PLATINUM
            } else if score >= 50 {
                3 // GOLD
            } else if score >= 30 {
                2 // SILVER
            } else if score >= 15 {
                1 // BRONZE
            } else {
                0 // ANON
            }
        }

        fn tier_label(tier: u8) -> &'static [u8] {
            match tier {
                5 => b"DIAMOND ",
                4 => b"PLATINUM",
                3 => b"GOLD    ",
                2 => b"SILVER  ",
                1 => b"BRONZE  ",
                _ => b"ANON    ",
            }
        }

        fn push_literal(target: &mut [u8; 256], cursor: &mut usize, literal: &[u8]) {
            for &byte in literal.iter() {
                if *cursor >= target.len() {
                    return;
                }
                target[*cursor] = byte;
                *cursor += 1;
            }
        }

        fn push_number(target: &mut [u8; 256], cursor: &mut usize, mut number: u64) {
            if *cursor >= target.len() {
                return;
            }

            if number == 0 {
                target[*cursor] = b'0';
                *cursor += 1;
                return;
            }

            let mut digits = [0u8; 20];
            let mut len = 0usize;

            while number > 0 && len < digits.len() {
                digits[len] = (b'0' + (number % 10) as u8);
                number /= 10;
                len += 1;
            }

            while len > 0 && *cursor < target.len() {
                len -= 1;
                target[*cursor] = digits[len];
                *cursor += 1;
            }
        }
    }
}
