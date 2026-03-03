require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        version: "0.8.24",
        settings: {
            optimizer: { enabled: true, runs: 200 },
            viaIR: true,
        },
    },
    paths: {
        sources: "./evm",
        tests: "./test",
        cache: "./cache_hardhat",
        artifacts: "./artifacts_hardhat",
    },
    networks: {
        hardhat: {},
        passet: {
            url: process.env.PASSET_RPC || "https://eth-rpc-testnet.polkadot.io/",
            chainId: 420420417,
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
        },
    },
};
