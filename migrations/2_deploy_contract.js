const OathKeeper = artifacts.require('./OathKeeper.sol');
const JURToken = artifacts.require('@openzeppelin/contracts/token//ERC20/ERC20.sol');

module.exports = function(deployer) {

    return deployer
        .then(() => {
            return deployer.deploy(JURToken);
        })
        .then(() => {
            return deployer.deploy(
                OathKeeper,
                JURToken.address
            );
        });
};