/**
 * Deploy Phase 5 PVM ink! contracts to Passet Hub Testnet
 * These contracts compile to PolkaVM bytecode, deployed via EVM interface.
 *
 * Usage:
 *   node contracts/scripts/deploy-pvm.mjs
 *
 * Reads ADMIN key from contracts/.env
 * Writes deployed addresses to backend/.env and contracts/addresses-latest.md
 */

import { ethers } from 'ethers';
import { readFileSync, appendFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');

// Load contracts/.env
dotenv.config({ path: join(ROOT, 'contracts', '.env') });

const RPC = process.env.PASSET_RPC || 'https://eth-rpc-testnet.polkadot.io/';
const KEY = process.env.ADMIN;
if (!KEY) { console.error('ADMIN key not set in contracts/.env'); process.exit(1); }

const provider = new ethers.JsonRpcProvider(RPC);
const wallet = new ethers.Wallet(KEY, provider);

console.log('Deployer:', wallet.address);
const balance = await provider.getBalance(wallet.address);
console.log('Balance:', ethers.formatEther(balance), 'PAS');

if (balance === 0n) {
    console.error('ERROR: Deployer has zero balance on Passet Hub testnet');
    console.error('Fund this address via https://faucet.polkadot.io/?parachain=1111');
    process.exit(1);
}

// Read polkavm bytecodes
const ARTIFACTS = [
    {
        name: 'NeuralScorer',
        envKey: 'NEURAL_SCORER_ADDRESS',
        path: join(ROOT, 'contracts', 'pvm', 'neural_scorer',
            'target', 'ink', 'neural_scorer.polkavm'),
    },
    {
        name: 'RiskAssessor',
        envKey: 'RISK_ASSESSOR_ADDRESS',
        path: join(ROOT, 'contracts', 'pvm', 'risk_assessor',
            'target', 'ink', 'risk_assessor.polkavm'),
    },
    {
        name: 'YieldMind',
        envKey: 'YIELD_MIND_ADDRESS',
        path: join(ROOT, 'contracts', 'pvm', 'yield_mind',
            'target', 'ink', 'yield_mind.polkavm'),
    },
];

const deployed = {};

for (const artifact of ARTIFACTS) {
    console.log(`\nDeploying ${artifact.name}...`);

    const bytecode = readFileSync(artifact.path);
    // Append the ink! constructor selector (0x9bae9d5e = `new()`)
    // On Passet Hub, the deployment data = PolkaVM bytecode + selector
    const data = '0x' + bytecode.toString('hex') + '9bae9d5e';

    // On Passet Hub (PolkaVM), ink! contracts are deployed via a raw CREATE tx.
    // The chain's revive pallet handles PolkaVM bytecode natively.
    // We must skip eth_estimateGas (it fails for PolkaVM) and set gas manually.
    const nonce = await provider.getTransactionCount(wallet.address);
    const feeData = await provider.getFeeData();

    const tx = await wallet.sendTransaction({
        nonce,
        to: null,           // CREATE
        value: ethers.parseEther('10'),  // storage deposit (returned if unneeded)
        data,
        gasLimit: 10_000_000n,    // fixed upper bound; unused gas is refunded
        maxFeePerGas: feeData.maxFeePerGas ?? feeData.gasPrice,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas ?? 0n,
    });
    console.log(`  tx: ${tx.hash}`);
    const receipt = await tx.wait();
    if (!receipt.contractAddress) {
        throw new Error(`Deploy failed - no contractAddress in receipt: ${JSON.stringify(receipt.status)}`);
    }

    const address = receipt.contractAddress;
    console.log(`  ${artifact.name} deployed at: ${address}`);
    deployed[artifact.envKey] = address;
}

// Write to backend/.env
const backendEnv = join(ROOT, 'backend', '.env');
let envContent = '';
for (const [key, val] of Object.entries(deployed)) {
    envContent += `\n${key}=${val}`;
}
envContent += `\nXCM_SETTLER_ADDRESS=0xbaaE8f7b97ac387DE8C433A218d63166Ce104Bb1`;
appendFileSync(backendEnv, envContent + '\n');
console.log('\nAppended to backend/.env:', envContent);

// Append to addresses-latest.md
const addrMd = join(ROOT, 'contracts', 'addresses-latest.md');
const mdSection = `
## Phase 5 AI Engine (ink!/PolkaVM)

Deploy date: ${new Date().toISOString().split('T')[0]}

| Contract | Address |
|----------|---------|
| NeuralScorer | \`${deployed.NEURAL_SCORER_ADDRESS}\` |
| RiskAssessor | \`${deployed.RISK_ASSESSOR_ADDRESS}\` |
| YieldMind    | \`${deployed.YIELD_MIND_ADDRESS}\` |
`;
appendFileSync(addrMd, mdSection);
console.log('\nAddresses appended to contracts/addresses-latest.md');
console.log('\nAll Phase 5 contracts deployed. Run backend services with:');
console.log('  node backend/src/aiEngine.js');
console.log('  node backend/src/xcmAcknowledger.js');
