import { ethers } from '../node_modules/ethers/dist/ethers.min.js';
const p = new ethers.JsonRpcProvider('https://eth-rpc-testnet.polkadot.io/');
const hash = process.argv[2];
const r = await p.getTransactionReceipt(hash);
if (!r) { console.log('Not mined yet'); }
else { console.log('Status:', r.status, '\nContract:', r.contractAddress, '\nGas:', r.gasUsed.toString()); }
