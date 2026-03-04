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

        /// Surgical Test 1: The Handshake
        /// Returns slash*35 + votes*35
        /// Expected: score(1, 7) = 280
        #[ink(message)]
        pub fn score(&self, slash_count: u64, vote_count: u64) -> u64 {
            slash_count
                .saturating_mul(35)
                .saturating_add(vote_count.saturating_mul(35))
        }

        /// Returns collateral ratio in basis points.
        /// Example: collateral_ratio(76) = 11820 (16000 - 76*55).
        #[ink(message)]
        pub fn collateral_ratio(&self, score: u64) -> u64 {
            use substrate_fixed::types::I32F32;

            let s = I32F32::from_num(score);
            let base = I32F32::from_num(16000u32);
            let slope = I32F32::from_num(55u32);
            (base - s * slope).to_num::<u64>()
        }
    }
}
