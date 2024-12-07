module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545, // Default port for Ganache
      network_id: "*", // Match any network ID
    },
  },
  compilers: {
    solc: {
      version: "0.8.13", // Match your contract's Solidity version
    },
  },
};
