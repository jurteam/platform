const OathKeeper = artifacts.require('./OathKeeper.sol');
const deployHelper = require('../../helper.js');

const Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

module.exports = function (deployer, network, accounts) {
    var JUR_TOKEN = deployHelper.getJURToken(network);
    console.log("JUR Token address:", JUR_TOKEN);

    return deployer.deploy(OathKeeper, JUR_TOKEN);
  
  }