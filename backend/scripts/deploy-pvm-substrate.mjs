/**
 * deploy-pvm-substrate.mjs
 *
 * Deploys all three ink! PVM contracts to Paseo Asset Hub via EVM RPC.
 *
 * How it works:
 *   pallet-revive on Paseo Asset Hub recognises the 0x50564d (PolkaVM) magic
 *   prefix in an eth_sendRawTransaction CREATE payload and deploys it as a
 *   PVM (ink!) contract. Constructor selector must be appended to the bytecode.
 *
 *   Fees are charged from the EVM balance of the deployer address
 *   (0xe37a8983570B39F305fe93D565A29F89366f3fFe).
 *
 * Usage:
 *   node scripts/deploy-pvm-substrate.mjs
 *
 * Reads:  contracts/pvm/<name>/target/ink/<name>.contract  (already built)
 * Writes: .env  (updates NEURAL_SCORER_ADDRESS, YIELD_MIND_ADDRESS, RISK_ASSESSOR_ADDRESS)
 */

import { ethers } from 'ethers';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = resolve(__dirname, '..', '..');
const ENV_PATH  = join(__dirname, '..', '.env');

const EVM_RPC   = 'https://eth-rpc-testnet.polkadot.io/';
const KEY       = '0x0e1c069181f0e5c444154e5934ec9126f9aa0941c7d4029e1a797a6207b1b623';
const CHAIN_ID  = 420420417n;

// ink! new() constructor selector (same for all 3 contracts)
const CONSTRUCTOR_SELECTOR = '9bae9d5e';

// ─── helpers ──────────────────────────────────────────────────────────────────

function readContract(name) {
  const path = join(ROOT, `contracts/pvm/${name}/target/ink/${name}.contract`);
  return JSON.parse(readFileSync(path, 'utf8'));
}

function updateEnv(key, value) {
  let contents = existsSync(ENV_PATH) ? readFileSync(ENV_PATH, 'utf8') : '';
  const pattern = new RegExp(`^${key}=.*$`, 'm');
  if (pattern.test(contents)) {
    contents = contents.replace(pattern, `${key}=${value}`);
  } else {
    contents = contents.trimEnd() + `\n${key}=${value}\n`;
  }
  writeFileSync(ENV_PATH, contents);
}

async function rpc(method, params) {
  const resp = await fetch(EVM_RPC, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', method, params, id: Date.now() }),
    signal: AbortSignal.timeout(20000),
  });
  return resp.json();
}

async function waitReceipt(hash) {
  process.stdout.write('  waiting');
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 3000));
    process.stdout.write('.');
    const r = await rpc('eth_getTransactionReceipt', [hash]);
    if (r.result) { console.log(''); return r.result; }
  }
  console.log(' timeout');
  return null;
}

async function deploy(wallet, name) {
  const bundle   = readContract(name);
  // ink! 6.x stores PVM binary in source.contract_binary (hex, starts with 0x50564d)
  // For pallet-revive EVM CREATE: append constructor selector after the code bytes
  const codeHex  = bundle.source.contract_binary;
  const bytecode = codeHex + CONSTRUCTOR_SELECTOR;   // code + new() selector, no args
  const kb       = Math.round(codeHex.length / 2 / 1024);

  const nonceResp = await rpc('eth_getTransactionCount', [wallet.address, 'pending']);
  const nonce     = parseInt(nonceResp.result, 16);
  const gpResp    = await rpc('eth_gasPrice', []);
  const gasPrice  = BigInt(gpResp.result);

  console.log(`\n→ Deploying ${name} (${kb}KB) nonce=${nonce} gasPrice=${gasPrice / 1_000_000_000n}Gwei`);

  const tx = {
    nonce,
    gasPrice,
    gasLimit: 10_000_000n,
    to: null,               // CREATE
    value: 0n,
    data: bytecode,
    chainId: CHAIN_ID,
  };

  const signed    = await wallet.signTransaction(tx);
  const sendResp  = await rpc('eth_sendRawTransaction', [signed]);

  if (sendResp.error) {
    throw new Error(`sendRawTransaction: ${JSON.stringify(sendResp.error)}`);
  }

  const txHash  = sendResp.result;
  console.log(`  TX: ${txHash}`);

  const receipt = await waitReceipt(txHash);
  if (!receipt)                  throw new Error('Receipt timeout');
  if (receipt.status !== '0x1') throw new Error(`Execution failed (status=${receipt.status})`);

  const addr = receipt.contractAddress;
  if (!addr) throw new Error('No contractAddress in receipt');
  return addr;
}

// ─── main ─────────────────────────────────────────────────────────────────────

const wallet = new ethers.Wallet(KEY);
console.log('EVM deployer:', wallet.address);

const balResp = await rpc('eth_getBalance', [wallet.address, 'latest']);
const balEth  = parseFloat(BigInt(balResp.result) / 1_000_000_000_000_000_000n);
console.log(`Balance: ~${balEth} ETH`);

const names = ['neural_scorer', 'risk_assessor', 'yield_mind'];
const envKeys = {
  neural_scorer:  'NEURAL_SCORER_ADDRESS',
  risk_assessor:  'RISK_ASSESSOR_ADDRESS',
  yield_mind:     'YIELD_MIND_ADDRESS',
};

const results = {};

for (const name of names) {
  try {
    const addr = await deploy(wallet, name);
    results[name] = addr;
    updateEnv(envKeys[name], addr);
    console.log(`✓ ${name}: ${addr}`);
  } catch (e) {
    console.error(`✗ ${name} failed:`, e.message);
  }
}

console.log('\n══ Deployment summary ══════════════════');
for (const [name, addr] of Object.entries(results)) {
  console.log(`  ${name.padEnd(16)} ${addr}`);
}
console.log('═══════════════════════════════════════');
console.log('\n.env updated. Run: node server.js\n');
process.exit(0);
