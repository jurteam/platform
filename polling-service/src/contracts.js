const web3 = require('./web3')
const contractConfig = require('./jurContractConfig.json')
const events = require('./events.js');

const watchContract = async (address, abi) => {
        return await new web3.eth.Contract(abi, address)
}

const setup = contractConfig.forEach((instance) => {
    let abi = require("./abi/" + instance.assetIdentifier + ".json");
    watchContract(instance.address, abi).then((contract) => {
        instance.events.forEach( async (event) => {
            events.subscribeLogEvent(instance.assetIdentifier, contract, event)
        })
    })
});
  
module.exports = {
    setup
}