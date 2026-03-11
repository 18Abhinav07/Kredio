import { ethers } from '../node_modules/ethers/dist/ethers.min.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');

const RPC = 'https://eth-rpc-testnet.polkadot.io/';
const KEY = '0x0e1c069181f0e5c444154e5934ec9126f9aa0941c7d4029e1a797a6207b1b623';
const provider = new ethers.JsonRpcProvider(RPC);
const wallet   = new ethers.Wallet(KEY, provider);

const CONTRACT = process.argv[2] || 'neural_scorer';
const SEL      = process.argv[3] === 'nosel' ? '' : '9bae9d5e';

const bytecode = readFileSync(join(ROOT, `contracts/pvm/${CONTRACT}/target/ink/${CONTRACT}.polkavm`));
const data = '0x' + Buffer.from(bytecode).toString('hex') + SEL;

const nonce   = await provider.getTransactionCount(wallet.address);
const feeData = await provider.getFeeData();

const tx = await wallet.sendTransaction({
  nonce,
  to: null,
  data,
  gasLimit: 15_000_000n,
  maxFeePerGas: feeData.maxFeePerGas || undefined,
  maxPriorityFeePerGas: feeData.maxPriorityFeePerGas || undefined,
  value: ethers.parseEther('10'),
});
process.stdout.write(`TX:${tx.hash}\n`);
const receipt = await tx.wait();
process.stdout.write(`Status:${receipt.status}\nContract:${receipt.contractAddress}\nGas:${receipt.gasUsed}\n`);
