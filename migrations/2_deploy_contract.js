const OathKeeper = artifacts.require('./OathKeeper.sol');
const JURToken = artifacts.require('@openzeppelin/contracts/token/ERC20/ERC20.sol');

const Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

module.exports = function (deployer, network, accounts) {
    var JUR_TOKEN = require('../config.json')[network.toString()].JUR_TOKEN;
    console.log("JUR Token address:", JUR_TOKEN);
    
    if (network == "development") {
        return deployer.deploy(JURToken).then(() => {
            return JURToken.deployed().then((jurToken) => {
              return deployer.deploy(OathKeeper, JURToken.address);
            });
        });
      } else {
        return deployer.deploy(OathKeeper, JUR_TOKEN);
      }
  
  }