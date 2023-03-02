// Lecture du .env
const dotenv = require("dotenv");
dotenv.config();

require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      // Url fournit par Infura ou Alchemy pour le déploiement
      url: process.env.RPC_URL,
      // A trouver sur metamask, account details (exporter la clé privée)
      accounts: [process.env.ACCOUNT_PRIVATE_KEY]
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
