// ─── XCM Message Builder ─────────────────────────────────────────────
// Constructs minimal valid SCALE-encoded XCM messages for Tesseract.
//
// For full SCALE encoding, use @polkadot/api:
//   const msg = api.createType('XcmVersionedXcm', { V3: [...] }).toHex()
//
// For demo/testnet, these pre-encoded templates work for basic transfers.

/**
 * Pre-encoded V3 XCM message: WithdrawAsset + BuyExecution + DepositAsset
 * This is a minimal valid XCM message that can be used for the demo.
 * It represents: "withdraw asset, pay fees, deposit to beneficiary"
 */
export const DEMO_XCM_MESSAGES = {
    // Minimal V3 XCM transfer to Paseo relay chain
    TRANSFER_TO_RELAY: '0x0308000400010300a10f0432050800000000000000000000000000000000000000000000000000000000000013000800000101',

    // Empty XCM for testing (weighMessage will still return valid weight)
    TEST_EMPTY: '0x0300',
} as const;

/**
 * Pre-encoded XCM destination MultiLocations
 */
export const XCM_DESTINATIONS = {
    // Parent (relay chain)
    RELAY_CHAIN: '0x0100',

    // Sibling parachain 2001 (Bifrost)
    BIFROST: '0x010100d107',

    // Sibling parachain 2000 (Acala)
    ACALA: '0x010100d007',
} as const;

/**
 * Build a human-readable XCM message descriptor for display
 */
export function describeXcmMessage(destination: string): string {
    switch (destination) {
        case XCM_DESTINATIONS.RELAY_CHAIN:
            return 'Transfer to Relay Chain (Paseo)';
        case XCM_DESTINATIONS.BIFROST:
            return 'Bridge to Bifrost (Para 2001)';
        case XCM_DESTINATIONS.ACALA:
            return 'Bridge to Acala (Para 2000)';
        default:
            return `Custom destination: ${destination.slice(0, 10)}...`;
    }
}

/**
 * Supported destination chains for the UI dropdown
 */
export const BRIDGE_DESTINATIONS = [
    { label: 'Paseo Relay Chain', value: XCM_DESTINATIONS.RELAY_CHAIN, paraId: 0 },
    { label: 'Bifrost (Para 2001)', value: XCM_DESTINATIONS.BIFROST, paraId: 2001 },
    { label: 'Acala (Para 2000)', value: XCM_DESTINATIONS.ACALA, paraId: 2000 },
] as const;
