import { ethers } from '../node_modules/ethers/dist/ethers.min.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');

const RPC = 'https://eth-rpc-testnet.polkadot.io/';
const KEY = '0x0e1c069181f0e5c444154e5934ec9126f9aa0941c7d4029e1a797a6207b1b623';
const provider = new ethers.JsonRpcProvider(RPC);
const wallet = new ethers.Wallet(KEY, provider);

const bytecode = readFileSync(join(ROOT, 'contracts/pvm/neural_scorer/target/ink/neural_scorer.polkavm'));
const data = '0x' + Buffer.from(bytecode).toString('hex') + '9bae9d5e';

const nonce = await provider.getTransactionCount(wallet.address);
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
console.log('TX hash:', tx.hash);
const receipt = await tx.wait();
console.log('Status:', receipt.status);
console.log('Contract:', receipt.contractAddress);
console.log('Gas used:', receipt.gasUsed.toString());
