'use strict';
// backend/src/xcmAcknowledger.js
// Phase 5 XCM lifecycle completer - turns every settleIntent() call into a
// 3-event Blockscout chain: IntentAuditLog → MessageDispatched → ExecutionAcknowledged
// Run: node backend/src/xcmAcknowledger.js

const { ethers } = require('ethers');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const RPC_URL = process.env.RPC || 'https://eth-rpc-testnet.polkadot.io/';
const KEY = process.env.KEY;

if (!KEY) { console.error('[xcmAcknowledger] KEY not set in .env - skipping XCM acknowledger'); }

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(KEY, provider);

const XCM_SETTLER_ADDRESS = process.env.XCM_SETTLER_ADDRESS
    || '0xbaaE8f7b97ac387DE8C433A218d63166Ce104Bb1';

const SETTLER_ABI = [
    // Phase 5 events
    'event IntentAuditLog(bytes32 indexed intentId, uint32 indexed sourceParaId, address indexed sender, uint8 intentType, uint256 amount, uint64 receivedBlock)',
    'event MessageDispatched(bytes32 indexed intentId, uint8 bridgeType, uint32 destinationId, bytes32 messageHash, uint64 dispatchedBlock, uint64 estimatedDeliveryBlocks)',
    'event ExecutionAcknowledged(bytes32 indexed intentId, bool success, bytes4 resultCode, uint64 acknowledgedBlock)',
    // Phase 5 functions
    'function recordMessageDispatched(bytes32 intentId, uint8 bridgeType, uint32 destinationId, bytes32 messageHash, uint64 estimatedDeliveryBlocks) external',
    'function acknowledgeExecution(bytes32 intentId, bool success, bytes4 resultCode) external',
];

const settler = new ethers.Contract(XCM_SETTLER_ADDRESS, SETTLER_ABI, wallet);

// On testnet: 50 blocks ≈ 5 minutes - realistic for demo, not 7 days
const TESTNET_ACK_DELAY_BLOCKS = 50;
const DISPATCH_DELAY_BLOCKS = 3;   // simulate dispatch preparation

async function waitBlocks(n) {
    if (n <= 0) return;
    const start = await provider.getBlockNumber();
    await new Promise((resolve) => {
        const check = async () => {
            try {
                const current = await provider.getBlockNumber();
                if (current >= start + n) { resolve(); return; }
            } catch (_) { }
            setTimeout(check, 6_000);
        };
        check();
    });
}

// ─── Polling-based event listener (eth_newFilter not supported on this RPC) ───

async function pollAndProcess(startBlock) {
    let fromBlock = startBlock;

    const poll = async () => {
        try {
            const toBlock = await provider.getBlockNumber();
            if (toBlock <= fromBlock) return;

            const logs = await settler.queryFilter(
                settler.filters.IntentAuditLog(),
                fromBlock + 1,
                toBlock,
            );

            for (const log of logs) {
                const { intentId, sourceParaId, sender, intentType } = log.args;
                console.log(`[xcmAcknowledger] IntentAuditLog  intentId:${intentId}  type:${intentType}  sender:${sender}`);

                // Step 1: Wait a few blocks then record MessageDispatched
                await waitBlocks(DISPATCH_DELAY_BLOCKS);

                const msgHash = ethers.keccak256(
                    ethers.AbiCoder.defaultAbiCoder().encode(
                        ['bytes32', 'uint256'],
                        [intentId, BigInt(Date.now())]
                    )
                );

                try {
                    const tx1 = await settler.recordMessageDispatched(
                        intentId,
                        0,
                        sourceParaId,
                        msgHash,
                        TESTNET_ACK_DELAY_BLOCKS,
                    );
                    await tx1.wait();
                    console.log(`[xcmAcknowledger] MessageDispatched recorded  tx:${tx1.hash}`);
                } catch (err) {
                    console.error('[xcmAcknowledger] recordMessageDispatched failed:', err.message);
                    continue;
                }

                // Step 2: Wait delivery window then acknowledge
                await waitBlocks(TESTNET_ACK_DELAY_BLOCKS);

                try {
                    const tx2 = await settler.acknowledgeExecution(intentId, true, '0x00000000');
                    await tx2.wait();
                    console.log(`[xcmAcknowledger] ExecutionAcknowledged       tx:${tx2.hash}`);
                } catch (err) {
                    console.error('[xcmAcknowledger] acknowledgeExecution failed:', err.message);
                }
            }

            fromBlock = toBlock;
        } catch (err) {
            console.error('[xcmAcknowledger] poll error:', err.message);
        }
    };

    poll();  // run immediately on start
    setInterval(poll, 12_000);  // poll every ~2 blocks (6s/block × 2)
}

// ─── Startup ──────────────────────────────────────────────────────────────────

async function start() {
    if (!KEY) return;
    const block = await provider.getBlockNumber();
    console.log(`[xcmAcknowledger] started at block ${block}`);
    console.log(`[xcmAcknowledger]   KredioXCMSettler  ${XCM_SETTLER_ADDRESS}`);
    console.log(`[xcmAcknowledger]   ack delay         ${TESTNET_ACK_DELAY_BLOCKS} blocks after dispatch`);
    console.log(`[xcmAcknowledger] listening for IntentAuditLog events...`);
    pollAndProcess(block);
}

module.exports = { start };

// allow standalone: node src/xcmAcknowledger.js
if (require.main === module) start().catch(err => console.error('[xcmAcknowledger]', err.message));
