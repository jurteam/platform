const path = require('path');
const smartContracts = require('../config/smart-contracts.json');
const event = require('./event');

module.exports = {
    listen() {
        try {

            // Listen for all the smart-contract specified in the config
            for (let i = 0; i < smartContracts.length; i++) {

                const instance = smartContracts[i];

                // Get the ABI-JSON
                let abi = require(path.resolve('config', instance.abiPath));

                // Get the object of smart-contract
                const contract = new web3.eth.Contract(abi, instance.address);

                // Loop through each event specified in the config
                for (let j = 0; j < instance.events.length; j++) {
                    event.subscribe(instance.identifier, contract, instance.events[j]); // subscribe to the specific event
                }
            }
        } catch (error) {
            console.log(error);

            // Exit process
            process.exit(1)
        }
    }
}