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
    .deploy({data: bytecode, arguments: [accounts[1], 2]})
    .send({from: accounts[0], gas: '1000000'});
});

describe('hodl', function() {
  this.timeout(3000);

  it('deploys a contract', () => {
    assert.ok(hodl.options.address);
  });

  it('prevents withdrawal before earliest', () => {
    assert.rejects(hodl.methods.withdraw().send({from: accounts[1]}));
  });

  it('allows withdrawal after earliest', (done) => {
    setTimeout(function() {
      assert.ok(hodl.methods.withdraw().send({from: accounts[1]}));
      done();
    }, 2000);
  });
});