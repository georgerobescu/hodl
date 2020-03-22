const path = require("path");
const HDWalletProvider = require('truffle-hdwallet-provider');
const {mnemonic, infura} = require('./keys');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${infura}`);
      },
      network_id: '3',
    }
  }
};
