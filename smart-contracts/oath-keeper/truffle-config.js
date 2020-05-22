module.exports = {
  networks: {
    "development": {
      host: "localhost",
      port: 8545,
      gas: 6721975,
      network_id: "*" // Match any network id
    },
    "testnet": {
      host: "localhost",
      port: 8545,
      gas: 6721975,
      network_id: "*" // Match any network id
    },
    "mainnet": {
      host: "localhost",
      port: 8545,
      gas: 6721975,
      network_id: "*" // Match any network id
    }
  },
  compilers: {
    solc: {
      version:"0.5.17",
      settings: {
        optimizer: {
          enabled:true,
          runs:600
        },
      }
    }
  }
};