const Rewards = artifacts.require("./JurRewards.sol");
const JURToken = artifacts.require(
  "@openzeppelin/contracts/token/ERC20/ERC20.sol"
);

module.exports = function (deployer, network, accounts) {
  var JUR_TOKEN = require("../config.json")[network.toString()].JUR_TOKEN;
  console.log("JUR Token address:", JUR_TOKEN);

  if (network == "development") {
    return deployer.deploy(JURToken).then(() => {
      return JURToken.deployed().then((jurToken) => {
        return deployer.deploy(Rewards, JURToken.address);
      });
    });
  } else {
    return deployer.deploy(Rewards, JUR_TOKEN);
  }
};
