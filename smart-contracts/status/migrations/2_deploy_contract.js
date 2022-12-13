const JurStatus = artifacts.require("JurStatus.sol");

module.exports = function(deployer) {
  deployer.deploy(JurStatus);
};
