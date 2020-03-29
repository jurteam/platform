const OathKeeper = artifacts.require('./OathKeeper.sol');
const JURToken = artifacts.require('@openzeppelin/contracts/token//ERC20/ERC20.sol');

module.exports = function(deployer, network) {

    if (network == "live") {
        return deployer.deploy(
            OathKeeper,
            process.env.JUR_TOKEN_ADDRESS
        );
    } else {
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
      }
};