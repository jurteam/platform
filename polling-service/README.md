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
`jurContractConfig.json` file in the `src` folder contains a json list of the contracts and their relevant events to watch. Simply add details and restart the service to integrate a new event. For example,

`{
    "assetIdentifier":"oathKeeper",
    "address":"0x730c7a23a6258ed2bad2eef4b227f3044dc160eb",
    "events":["OathTaken","IHoldYourOathFulfilled"]
}`

`assetIdentifier` is the identifier used on the platform (polling-service, meassge broker service and jbp) to identify the contract/event. It is also the name of the queue used to publish/consume the event details. Every new assetIdentifier found in the jurContractConfig.json file, will create a fresh queue.

`address` is the address of the contract

`events` is the array list of event names to watch