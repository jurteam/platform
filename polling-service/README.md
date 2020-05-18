# Vechain Polling Service

## Prerequisites
`npm install pm2 -g`

## Running the service
1. Install all the required libraries by running,
`npm install`

2. Create a .env file and provide the required configurations. A sample .env has been added in the repo.

3. Run the service by using,
`pm2 start index.js`

## Adding a new event
`smart-contracts.json` file in the `config` folder contains a json list of the contracts and their relevant events to watch. Simply add details and restart the service to integrate a new event. For example,

`{
        "identifier": "oathKeeper",
        "address": "0x1d34b7409114772d09784aeaa3203055c6805fe9",
        "abiPath": "./abi/oathKeeper.json",
        "events": [
            "OathTaken",
            "IHoldYourOathFulfilled"
        ]
    }`

`assetIdentifier` is the identifier used on the platform (polling-service, meassge broker service and jbp) to identify the contract/event. It is also the name of the queue used to publish/consume the event details. Every new `assetIdentifier` found in the `smart-contracts.json` file, will create a fresh queue.

`address` is the address of the contract

`events` is the array list of event names to watch

`abiPath` is the file path to the ABI-JSON for the smart-contract