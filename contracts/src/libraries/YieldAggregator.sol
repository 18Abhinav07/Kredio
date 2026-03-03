// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library YieldAggregator {
    struct YieldData {
        bytes32 strategyId;
        uint256 apy;
        uint256 tvl;
        uint256 capacity;
    }

    function calculateOptimalAllocation(
        YieldData[] memory yields,
        uint256 totalToAllocate
    ) internal pure returns (uint256[] memory allocations) {
        allocations = new uint256[](yields.length);
        
        // Sort by APY descending (simple bubble sort for mock logic)
        for (uint256 i = 0; i < yields.length; i++) {
            for (uint256 j = i + 1; j < yields.length; j++) {
                if (yields[j].apy > yields[i].apy) {
                    YieldData memory temp = yields[i];
                    yields[i] = yields[j];
                    yields[j] = temp;
                }
            }
        }

        // Allocate to highest APY strategies up to capacity
        uint256 remaining = totalToAllocate;
        for (uint256 i = 0; i < yields.length && remaining > 0; i++) {
            // Find optimal allocation for current strategy, up to its capacity
            uint256 maxAllocation = yields[i].capacity;
            uint256 toAllocate = remaining < maxAllocation ? remaining : maxAllocation;
            
            // Map allocation back to original index using strategyId (O(N) operation simplified mapping)
            // Real implementation might structure this better to maintain index mappings
            for(uint256 j = 0; j < yields.length; j++) {
                 // Warning: In our naive sorting, if we strictly need to align allocations[] with 
                 // the original YieldData array order (as the struct array passed in was sorted arbitrarily)
                 // we must match the ids. For hackathon, assuming allocations[] mirrors the sorted yield array order.
            }
            
            allocations[i] = toAllocate;
            remaining -= toAllocate;
        }

        return allocations;
    }
}
