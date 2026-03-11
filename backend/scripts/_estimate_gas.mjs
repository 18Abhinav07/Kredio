import { ethers } from '../node_modules/ethers/dist/ethers.min.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const RPC = 'https://eth-rpc-testnet.polkadot.io/';
const ADMIN = '0xe37a8983570B39F305fe93D565A29F89366f3fFe';

const provider = new ethers.JsonRpcProvider(RPC);

const contracts = ['risk_assessor', 'neural_scorer', 'yield_mind'];
for (const name of contracts) {
  const bytecode = readFileSync(join(ROOT, `contracts/pvm/${name}/target/ink/${name}.polkavm`));
  const data = '0x' + Buffer.from(bytecode).toString('hex') + '9bae9d5e';
  const gas = await provider.estimateGas({from: ADMIN, to: null, data, value: ethers.parseEther('10')}).catch(e => 'ERROR: ' + e.shortMessage);
  process.stdout.write(`${name}: estimated gas = ${gas}\n`);
}
