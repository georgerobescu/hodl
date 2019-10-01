var Hodl = artifacts.require("./Hodl.sol");

module.exports = function(deployer) {
  deployer.deploy(Hodl)
    .then(() => {
      console.log(Hodl.address);
    });
};
