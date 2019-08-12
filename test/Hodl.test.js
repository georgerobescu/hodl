const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const {interface, bytecode} = require('../compile');

const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
};

const web3 = new Web3(ganache.provider(), null, OPTIONS);

let accounts;
let hodl;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  hodl = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: [accounts[1], 30]})
    .send({from: accounts[0], gas: '1000000'});
});

describe('Hodl', () => {
  it('deploys a contract', () => {
    assert.ok(hodl.options.address);
  });
});