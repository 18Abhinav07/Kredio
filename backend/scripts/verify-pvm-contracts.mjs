/**
 * verify-pvm-contracts.mjs
 *
 * End-to-end verification that the three deployed PVM contracts
 * work correctly on Paseo Asset Hub.
 *
 * Usage:  node scripts/verify-pvm-contracts.mjs
 */

import { ethers } from '/Users/18abhinav07/Documents/Kredio/backend/node_modules/ethers/lib.esm/index.js';
import { readFileSync } from 'fs';

const RPC = 'https://eth-rpc-testnet.polkadot.io/';
const KEY = '0x0e1c069181f0e5c444154e5934ec9126f9aa0941c7d4029e1a797a6207b1b623';
const CHAIN_ID = 420420417n;

const ADDR = {
  neural_scorer: '0xac6bd3ff3447d8d1689dd4f02899ff558f108e0d',
  risk_assessor: '0xdB9E48932E061D95E22370235ac3a35332d289f7',
  yield_mind: '0x0b68fbfb596846e4f3a23da10365e0888a182ef3',
};

// ─── SCALE codec helpers ─────────────────────────────────────────────────────
// ink! returns SCALE-encoded results: Result<T, E> = 0x00 (Ok) | 0x01 (Err)
// followed by the T or E value.

function hexToBytes(hex) {
  const h = hex.startsWith('0x') ? hex.slice(2) : hex;
  const bytes = [];
  for (let i = 0; i < h.length; i += 2) bytes.push(parseInt(h.slice(i, i + 2), 16));
  return bytes;
}

function decodeU8(bytes, offset = 0) {
  return { val: bytes[offset], next: offset + 1 };
}

function decodeU32LE(bytes, offset = 0) {
  const val = bytes[offset] | (bytes[offset + 1] << 8) | (bytes[offset + 2] << 16) | (bytes[offset + 3] << 24);
  return { val: val >>> 0, next: offset + 4 };
}

function decodeU64LE(bytes, offset = 0) {
  const lo = BigInt(bytes[offset] | (bytes[offset + 1] << 8) | (bytes[offset + 2] << 16) | (bytes[offset + 3] << 24)) & 0xFFFFFFFFn;
  const hi = BigInt(bytes[offset + 4] | (bytes[offset + 5] << 8) | (bytes[offset + 6] << 16) | (bytes[offset + 7] << 24)) & 0xFFFFFFFFn;
  return { val: (hi << 32n) | lo, next: offset + 8 };
}

function decodeResult(bytes, decoder) {
  if (bytes[0] === 0x00) {
    // Ok - skip 1 byte variant tag, then nested Ok (another 0x00)
    if (bytes[1] === 0x00) {
      return { ok: decoder(bytes, 2) };
    }
    return { ok: decoder(bytes, 1) };
  }
  return { err: bytes.slice(1) };
}

// Decode Result<u8, _>
function decodeResultU8(hex) {
  const b = hexToBytes(hex);
  return decodeResult(b, (b, off) => decodeU8(b, off).val);
}

// Decode Result<u32, _>
function decodeResultU32(hex) {
  const b = hexToBytes(hex);
  return decodeResult(b, (b, off) => decodeU32LE(b, off).val);
}

// Decode PositionRisk struct: 
//   liquidation_probability_pct: u8
//   estimated_blocks_to_liq:     u32
//   risk_tier:                   u8
//   collateral_buffer_bps:        u32
//   recommended_top_up_atoms:    u64
function decodePositionRisk(hex) {
  const b = hexToBytes(hex);
  // skip outer Result<Ok(Ok(...))> = 0x00 0x00
  let off = 0;
  while (off < 2 && b[off] === 0x00) off++;
  const liq_prob = decodeU8(b, off); off = liq_prob.next;
  const blocks = decodeU32LE(b, off); off = blocks.next;
  const risk_tier = decodeU8(b, off); off = risk_tier.next;
  const buf_bps = decodeU32LE(b, off); off = buf_bps.next;
  const top_up = decodeU64LE(b, off);
  return {
    liquidation_probability_pct: liq_prob.val,
    estimated_blocks_to_liq: blocks.val,
    risk_tier: risk_tier.val,
    collateral_buffer_bps: buf_bps.val,
    recommended_top_up_atoms: top_up.val,
  };
}

// Decode AllocationDecision:
//   conservative_bps:  u32
//   balanced_bps:      u32
//   aggressive_bps:    u32
//   idle_bps:          u32
//   projected_apy_bps: u32
//   confidence:        u8
//   reasoning_code:    u8
function decodeAllocation(hex) {
  const b = hexToBytes(hex);
  let off = 0;
  while (off < 2 && b[off] === 0x00) off++;
  const cons = decodeU32LE(b, off); off = cons.next;
  const bal = decodeU32LE(b, off); off = bal.next;
  const agg = decodeU32LE(b, off); off = agg.next;
  const idle = decodeU32LE(b, off); off = idle.next;
  const apy = decodeU32LE(b, off); off = apy.next;
  const conf = decodeU8(b, off); off = conf.next;
  const code = decodeU8(b, off);
  return {
    conservative_bps: cons.val,
    balanced_bps: bal.val,
    aggressive_bps: agg.val,
    idle_bps: idle.val,
    projected_apy_bps: apy.val,
    confidence: conf.val,
    reasoning_code: code.val,
  };
}

// ─── RPC helpers ─────────────────────────────────────────────────────────────

async function rpc(method, params) {
  const resp = await fetch(RPC, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', method, params, id: Date.now() }),
    signal: AbortSignal.timeout(20000),
  });
  const json = await resp.json();
  if (json.error) throw new Error(`RPC ${method}: ${JSON.stringify(json.error)}`);
  return json.result;
}

// eth_call - for view queries (no gas used)
async function ethCall(to, data) {
  return rpc('eth_call', [{ to, data }, 'latest']);
}

// eth_sendRawTransaction - for state-changing calls
// Returns { hash, nonce: usedNonce }
async function sendTx(to, data, wallet, nonce, gasPrice) {
  // Try nonces starting from `nonce` until we get one that's accepted
  for (let n = nonce; n < nonce + 20; n++) {
    const tx = {
      nonce: n,
      gasPrice,
      gasLimit: 5_000_000n,
      to,
      value: 0n,
      data,
      chainId: CHAIN_ID,
    };
    const signed = await wallet.signTransaction(tx);
    try {
      const hash = await rpc('eth_sendRawTransaction', [signed]);
      return { hash, nonce: n };
    } catch (e) {
      if (e.message.includes('Already Imported') || e.message.includes('already known')) {
        // This nonce was already submitted - skip to next
        continue;
      }
      throw e;
    }
  }
  throw new Error('Could not find an available nonce after 20 retries');
}

async function waitReceipt(hash) {
  process.stdout.write('  mining');
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 3000));
    process.stdout.write('.');
    const r = await rpc('eth_getTransactionReceipt', [hash]).catch(() => null);
    if (r) { console.log(''); return r; }
  }
  console.log(' timeout');
  return null;
}

// ─── SCALE ABI encode helpers ─────────────────────────────────────────────────
// For ink! calls: data = 4-byte selector + SCALE-encoded args

function toSelector(hex) {
  return hex.startsWith('0x') ? hex : '0x' + hex;
}

function encodeU8(v) { return [(v & 0xff)]; }
function encodeU32LE(v) {
  return [v & 0xff, (v >> 8) & 0xff, (v >> 16) & 0xff, (v >> 24) & 0xff];
}
function encodeI32LE(v) { return encodeU32LE(v >>> 0); }  // reinterpret as u32
function encodeU64LE(v) {
  const lo = Number(BigInt(v) & 0xFFFFFFFFn);
  const hi = Number((BigInt(v) >> 32n) & 0xFFFFFFFFn);
  return [...encodeU32LE(lo), ...encodeU32LE(hi)];
}
function encodeAddress(ethAddr) {
  const hex = ethAddr.toLowerCase().replace('0x', '');
  const bytes = [];
  for (let i = 0; i < 40; i += 2) bytes.push(parseInt(hex.slice(i, i + 2), 16));
  return bytes;
}

function buildCallData(selectorHex, argBytes) {
  const sel = hexToBytes(selectorHex.slice(2));  // 4 bytes
  return '0x' + [...sel, ...argBytes].map(b => b.toString(16).padStart(2, '0')).join('');
}

// ─── Tests ────────────────────────────────────────────────────────────────────

let pass = 0;
let fail = 0;

function assert(label, condition, got, expected) {
  if (condition) {
    console.log(`  ✓ ${label}:`, got);
    pass++;
  } else {
    console.error(`  ✗ ${label}: expected ${expected}, got`, got);
    fail++;
  }
}

// ─── neural_scorer ────────────────────────────────────────────────────────────

async function testNeuralScorer(wallet, nonce, gasPrice) {
  console.log('\n━━━ neural_scorer @ ' + ADDR.neural_scorer + ' ━━━');
  const addr = ADDR.neural_scorer;

  // 1. version() - view call, returns u32
  {
    const data = buildCallData('0xec6d41e1', []);
    const raw = await ethCall(addr, data);
    console.log('  version() raw:', raw);
    const b = hexToBytes(raw);
    // skip 0x00 0x00 prefix → u32 at offset 2
    let off = 0;
    while (off < b.length && b[off] === 0x00) off++;
    const ver = decodeU32LE(b, off).val;
    assert('version() returns u32=1', ver === 1, ver, 1);
  }

  // 2. owner() - view call, returns Address (20 bytes)
  {
    const data = buildCallData('0xfeaea4fa', []);
    const raw = await ethCall(addr, data);
    console.log('  owner() raw:', raw);
    // Result<Ok(Address)> - skip 0x00 0x00, read 20 bytes
    const b = hexToBytes(raw);
    let off = 0;
    while (off < b.length && b[off] === 0x00) off++;
    const ownerBytes = b.slice(off, off + 20);
    const ownerHex = '0x' + ownerBytes.map(x => x.toString(16).padStart(2, '0')).join('');
    const deployerAddr = wallet.address.toLowerCase();
    assert('owner() returns deployer address', ownerHex.toLowerCase() === deployerAddr, ownerHex, deployerAddr);
  }

  // 3. infer() - state-changing call
  // Args: account=[u8;20], repayment_count=u32, liquidation_count=u32,
  //       deposit_tier=u8, age_blocks=u32, deterministic_score=u8
  // Test case: good borrower - 10 repayments, 0 liquidations, tier 5, 1M blocks, score 80
  {
    const argBytes = [
      ...encodeAddress(wallet.address),  // account
      ...encodeU32LE(10),                // repayment_count
      ...encodeU32LE(0),                 // liquidation_count
      ...encodeU8(5),                    // deposit_tier
      ...encodeU32LE(1_000_000),         // age_blocks
      ...encodeU8(80),                   // deterministic_score
    ];
    const data = buildCallData('0xb323a37b', argBytes);
    console.log(`\n  infer() test - good borrower (10 repayments, 0 liqs, tier 5, 1M blocks, det=80)`);

    const { hash: h1, nonce: n1 } = await sendTx(addr, data, wallet, nonce, gasPrice);
    nonce = n1 + 1;
    console.log('  TX:', h1);
    const hash = h1;
    const receipt = await waitReceipt(hash);
    if (!receipt) { fail++; console.error('  ✗ infer() no receipt'); return { nonce }; }

    assert('infer() status=0x1 (success)', receipt.status === '0x1', receipt.status, '0x1');
    console.log('  Gas used:', parseInt(receipt.gasUsed, 16).toLocaleString());

    // Verify via view call that the contract is still callable after state change
    const verData = buildCallData('0xec6d41e1', []);
    const verRaw = await ethCall(addr, verData);
    const b = hexToBytes(verRaw);
    let off = 0;
    while (off < b.length && b[off] === 0x00) off++;
    const ver = decodeU32LE(b, off).val;
    assert('version() still == 1 after infer()', ver === 1, ver, 1);
  }

  // 4. infer() - risky borrower (0 repayments, 3 liquidations, tier 0, 100 blocks, score 20)
  {
    const argBytes = [
      ...encodeAddress(wallet.address),
      ...encodeU32LE(0),
      ...encodeU32LE(3),
      ...encodeU8(0),
      ...encodeU32LE(100),
      ...encodeU8(20),
    ];
    const data = buildCallData('0xb323a37b', argBytes);
    console.log(`\n  infer() test - risky borrower (0 repayments, 3 liqs, tier 0, 100 blocks, det=20)`);

    const { hash: h2, nonce: n2 } = await sendTx(addr, data, wallet, nonce, gasPrice);
    nonce = n2 + 1;
    console.log('  TX:', h2);
    const hash = h2;
    const receipt = await waitReceipt(hash);
    if (receipt) assert('infer() risky borrower status=0x1', receipt.status === '0x1', receipt.status, '0x1');
  }

  return { nonce };
}

// ─── risk_assessor ────────────────────────────────────────────────────────────

async function testRiskAssessor(wallet, nonce, gasPrice) {
  console.log('\n━━━ risk_assessor @ ' + ADDR.risk_assessor + ' ━━━');
  const addr = ADDR.risk_assessor;

  // 1. owner() view call
  {
    const data = buildCallData('0xfeaea4fa', []);
    const raw = await ethCall(addr, data);
    const b = hexToBytes(raw);
    let off = 0;
    while (off < b.length && b[off] === 0x00) off++;
    const ownerHex = '0x' + b.slice(off, off + 20).map(x => x.toString(16).padStart(2, '0')).join('');
    assert('owner() returns deployer', ownerHex.toLowerCase() === wallet.address.toLowerCase(), ownerHex, wallet.address.toLowerCase());
  }

  // 2. assess_position() - healthy position
  // collateral=200 USD (200e6), debt=100 USD (100e6), credit=80, change=-200bps, liq_ratio=11000
  {
    const argBytes = [
      ...encodeAddress(wallet.address),
      ...encodeU64LE(200_000_000),   // collateral_usd_x6 = $200
      ...encodeU64LE(100_000_000),   // debt_usd_x6 = $100
      ...encodeU8(80),               // credit_score
      ...encodeI32LE(-200),          // price_7d_change_bps (slight drop)
      ...encodeU32LE(11_000),        // liq_ratio_bps = 110%
    ];
    const data = buildCallData('0x392c875f', argBytes);
    console.log(`\n  assess_position() - healthy: $200 collateral / $100 debt / score=80`);

    const { hash: h3, nonce: n3 } = await sendTx(addr, data, wallet, nonce, gasPrice);
    nonce = n3 + 1;
    console.log('  TX:', h3);
    const hash = h3;
    const receipt = await waitReceipt(hash);
    if (!receipt) { fail++; return { nonce }; }
    assert('assess_position() healthy status=0x1', receipt.status === '0x1', receipt.status, '0x1');
    console.log('  Gas used:', parseInt(receipt.gasUsed, 16).toLocaleString());
  }

  // 3. assess_position() - at-risk position: collateral barely covers debt
  {
    const argBytes = [
      ...encodeAddress(wallet.address),
      ...encodeU64LE(110_000_000),   // collateral = $110
      ...encodeU64LE(100_000_000),   // debt = $100 (110% CR = exactly at liq threshold)
      ...encodeU8(30),               // low credit score
      ...encodeI32LE(-800),          // -8% 7d price drop
      ...encodeU32LE(11_000),
    ];
    const data = buildCallData('0x392c875f', argBytes);
    console.log(`\n  assess_position() - at-risk: $110 collateral / $100 debt / score=30 / -8% drop`);

    const { hash: h4, nonce: n4 } = await sendTx(addr, data, wallet, nonce, gasPrice);
    nonce = n4 + 1;
    console.log('  TX:', h4);
    const hash = h4;
    const receipt = await waitReceipt(hash);
    if (receipt) assert('assess_position() at-risk status=0x1', receipt.status === '0x1', receipt.status, '0x1');
  }

  return { nonce };
}

// ─── yield_mind ───────────────────────────────────────────────────────────────

async function testYieldMind(wallet, nonce, gasPrice) {
  console.log('\n━━━ yield_mind @ ' + ADDR.yield_mind + ' ━━━');
  const addr = ADDR.yield_mind;

  // 1. apys() view - returns (u32, u32, u32): conservative, balanced, aggressive
  {
    const data = buildCallData('0x6b2d8978', []);
    const raw = await ethCall(addr, data);
    console.log('  apys() raw:', raw);
    const b = hexToBytes(raw);
    let off = 0;
    while (off < b.length && b[off] === 0x00) off++;
    const cons = decodeU32LE(b, off); off = cons.next;
    const bal = decodeU32LE(b, off); off = bal.next;
    const agg = decodeU32LE(b, off);
    assert('apys() conservative_apy_bps=650', cons.val === 650, cons.val, 650);
    assert('apys() balanced_apy_bps=1100', bal.val === 1100, bal.val, 1100);
    assert('apys() aggressive_apy_bps=1800', agg.val === 1800, agg.val, 1800);
  }

  // 2. owner() view
  {
    const data = buildCallData('0xfeaea4fa', []);
    const raw = await ethCall(addr, data);
    const b = hexToBytes(raw);
    let off = 0;
    while (off < b.length && b[off] === 0x00) off++;
    const ownerHex = '0x' + b.slice(off, off + 20).map(x => x.toString(16).padStart(2, '0')).join('');
    assert('owner() returns deployer', ownerHex.toLowerCase() === wallet.address.toLowerCase(), ownerHex, wallet.address.toLowerCase());
  }

  // 3. compute_allocation() - NORMAL utilisation (50%)
  // total_deposited=1000 USD, total_borrowed=500 USD (50% util)
  {
    const argBytes = [
      ...encodeU64LE(1_000_000_000),  // total_deposited = $1000 (x6 decimals? actually u64 atom count)
      ...encodeU64LE(500_000_000),    // total_borrowed = $500
      ...encodeU64LE(100_000_000),    // strategy_balance (ignored in impl)
      ...encodeU8(70),                // avg_credit_score
      ...encodeU32LE(200),            // volatility_bps (2%)
      ...encodeU32LE(100),            // blocks_since_rebalance
    ];
    const data = buildCallData('0x3f705728', argBytes);
    console.log(`\n  compute_allocation() - normal: 50% util, score=70, vol=2%`);

    const { hash: h5, nonce: n5 } = await sendTx(addr, data, wallet, nonce, gasPrice);
    nonce = n5 + 1;
    console.log('  TX:', h5);
    const hash = h5;
    const receipt = await waitReceipt(hash);
    if (!receipt) { fail++; return { nonce }; }
    assert('compute_allocation() normal status=0x1', receipt.status === '0x1', receipt.status, '0x1');
    console.log('  Gas used:', parseInt(receipt.gasUsed, 16).toLocaleString());
  }

  // 4. compute_allocation() - HIGH util (80%) → should show HighUtil reasoning
  {
    const argBytes = [
      ...encodeU64LE(1_000_000_000),
      ...encodeU64LE(800_000_000),   // 80% utilisation
      ...encodeU64LE(50_000_000),
      ...encodeU8(60),
      ...encodeU32LE(300),
      ...encodeU32LE(500),
    ];
    const data = buildCallData('0x3f705728', argBytes);
    console.log(`\n  compute_allocation() - high util: 80% util`);

    const { hash: h6, nonce: n6 } = await sendTx(addr, data, wallet, nonce, gasPrice);
    nonce = n6 + 1;
    console.log('  TX:', h6);
    const hash = h6;
    const receipt = await waitReceipt(hash);
    if (receipt) assert('compute_allocation() high-util status=0x1', receipt.status === '0x1', receipt.status, '0x1');
  }

  // 5. compute_allocation() - VOLATILE market (vol_bps=600 > 500 threshold)
  {
    const argBytes = [
      ...encodeU64LE(1_000_000_000),
      ...encodeU64LE(400_000_000),
      ...encodeU64LE(100_000_000),
      ...encodeU8(65),
      ...encodeU32LE(600),           // volatile
      ...encodeU32LE(200),
    ];
    const data = buildCallData('0x3f705728', argBytes);
    console.log(`\n  compute_allocation() - volatile: vol=6%`);

    const { hash: h7, nonce: n7 } = await sendTx(addr, data, wallet, nonce, gasPrice);
    nonce = n7 + 1;
    console.log('  TX:', h7);
    const hash = h7;
    const receipt = await waitReceipt(hash);
    if (receipt) assert('compute_allocation() volatile status=0x1', receipt.status === '0x1', receipt.status, '0x1');
  }

  // 6. update_apys() - update then verify with apys()
  {
    const argBytes = [
      ...encodeU32LE(700),   // conservative: 7%
      ...encodeU32LE(1200),  // balanced: 12%
      ...encodeU32LE(2000),  // aggressive: 20%
    ];
    const data = buildCallData('0x9a59078f', argBytes);
    console.log(`\n  update_apys() → set conservative=700 balanced=1200 aggressive=2000`);

    const { hash: h8, nonce: n8 } = await sendTx(addr, data, wallet, nonce, gasPrice);
    nonce = n8 + 1;
    console.log('  TX:', h8);
    const hash = h8;
    const receipt = await waitReceipt(hash);
    if (!receipt) { fail++; return { nonce }; }
    assert('update_apys() status=0x1', receipt.status === '0x1', receipt.status, '0x1');

    // Verify new APYs via view call
    const viewData = buildCallData('0x6b2d8978', []);
    const raw = await ethCall(addr, viewData);
    const b = hexToBytes(raw);
    let off = 0;
    while (off < b.length && b[off] === 0x00) off++;
    const cons = decodeU32LE(b, off); off = cons.next;
    const bal = decodeU32LE(b, off); off = bal.next;
    const agg = decodeU32LE(b, off);
    assert('apys() conservative updated to 700', cons.val === 700, cons.val, 700);
    assert('apys() balanced updated to 1200', bal.val === 1200, bal.val, 1200);
    assert('apys() aggressive updated to 2000', agg.val === 2000, agg.val, 2000);
  }

  return { nonce };
}

// ─── main ─────────────────────────────────────────────────────────────────────

console.log('═══════════════════════════════════════════════');
console.log(' Kredio PVM Contract Verification');
console.log('═══════════════════════════════════════════════');
console.log('Chain:  Paseo Asset Hub (chain ID 420420417)');
console.log('RPC:   ', RPC);
console.log('');

const wallet = new ethers.Wallet(KEY);
console.log('Deployer:', wallet.address);

// Fetch nonce and gas price fresh
const nonceHex = await rpc('eth_getTransactionCount', [wallet.address, 'pending']);
const gasPriceHex = await rpc('eth_gasPrice', []);
let nonce = parseInt(nonceHex, 16);
const gasPrice = BigInt(gasPriceHex);

console.log(`Starting nonce: ${nonce}  gasPrice: ${gasPrice / 1_000_000_000n}Gwei`);

// Verify code is deployed at all three addresses
for (const [name, addr] of Object.entries(ADDR)) {
  const code = await rpc('eth_getCode', [addr, 'latest']);
  const ok = code !== '0x' && code.length > 10;
  assert(`${name} has code at ${addr}`, ok, `${code.length / 2 - 1}bytes`, '>0');
}

// Run tests sequentially (share nonce)
const r1 = await testNeuralScorer(wallet, nonce, gasPrice);
nonce = r1.nonce;

const r2 = await testRiskAssessor(wallet, nonce, gasPrice);
nonce = r2.nonce;

const r3 = await testYieldMind(wallet, nonce, gasPrice);
nonce = r3.nonce;

// ─── Summary ──────────────────────────────────────────────────────────────────

console.log('\n═══════════════════════════════════════════════');
console.log(` RESULTS:  ${pass} passed  ${fail} failed`);
console.log('═══════════════════════════════════════════════');

process.exit(fail > 0 ? 1 : 0);
