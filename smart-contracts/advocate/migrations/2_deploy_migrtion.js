const JurAdvocate = artifacts.require("JurAdvocate.sol");

module.exports = function (deployer) {
  deployer.deploy(JurAdvocate);
};
