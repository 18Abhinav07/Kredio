const { ethers } = require('ethers');
const provider = new ethers.JsonRpcProvider('https://eth-rpc-testnet.polkadot.io/');
require('dotenv').config({ path: '../contracts/.env' });
const admin = new ethers.Wallet(process.env.ADMIN, provider);
const LENDING_ADDR = '0x1dB4Faad3081aAfe26eC0ef6886F04f28D944AAB';
const LENDING_ABI = [
    'function admin() view returns (address)'
];
const lending = new ethers.Contract(LENDING_ADDR, LENDING_ABI, admin);

async function run() {
    try {
        console.log("Yield pool admin:", await lending.admin());
        console.log("My admin:", admin.address);
    } catch (e) {
        console.error("Error:", e);
    }
}
run();
