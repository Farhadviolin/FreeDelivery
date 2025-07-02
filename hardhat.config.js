require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    goerli: {
      url: process.env.GOERLI_RPC_URL || "https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID",
      accounts: process.env.GOERLI_PRIVATE_KEY ? [process.env.GOERLI_PRIVATE_KEY] : []
    }
  }
};
