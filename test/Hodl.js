const Hodl = artifacts.require('Hodl');
const { expectRevert } = require('openzeppelin-test-helpers');

contract('Hodl', accounts => {
  let hodl

  beforeEach(async () => {
    hodl = await Hodl.deployed();
  });

  it('Should deposit the correct amount', async () => {
    await hodl.deposit(1, 10000, {from: accounts[0], value: 10000});
    const user = await hodl.getUser(accounts[0]);
    assert(user[1].toNumber() === 10000);
  });

  it('Should not withdraw before end of lockup', async () => {
    await expectRevert(hodl.withdraw({from: accounts[0]}), "You cannot yet withdraw your holdings.");
  });

  // 16 second timeout used due to 15 second time padding
  it('Should withdraw the correct amount without error', (done) => {
    setTimeout(async () => {
      await hodl.withdraw({from: accounts[0]});
      const user = await hodl.getUser(accounts[0]);
      console.log(user[1].toNumber());
      assert(user[1].toNumber() === 0);
      done();
    }, 16000);
  });

  it('Should not deposit twice with the same account', async () => {
    await hodl.deposit(15, 10000, {from: accounts[1], value: 10000});
    await expectRevert(hodl.deposit(15, 10000, {from: accounts[1], value: 10000}), "You can only hodl once per account.")
  });

  it('Should set user as hodler after deposit', async () => {
    await hodl.deposit(1, 10000, {from: accounts[2], value: 10000});
    const user = await hodl.getUser(accounts[2]);
    assert(user[2] === true);
  });

  it('Should set user as not hodler after withdrawal', async () => {
    setTimeout(async () => {
      await hodl.withdraw({from: accounts[2]});
      const user = await hodl.getUser(accounts[2]);
      assert(user[2] === false);
      done();
    }, 16000);
  });
});