const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');
const keys = require('./keys');

const provider = new HDWalletProvider(
  keys.privkey,
  'http://rinkeby.infura.io/v3/16ecd43deacb4e5f8410126db8706727'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from: ', accounts[0]);
};
deploy();