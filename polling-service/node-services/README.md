# Vechain Polling Service


## Running the service
1. Install all the required libraries by running,
`npm install`

2. Create a .env file and provide the required configurations. A sample .env has been added in the repo.

3. Run the service by using,
`npm start`

## Adding a new event
`smart-contracts.json` file in the `config` folder contains a json list of the contracts and their relevant events to watch. Simply add details and restart the service to integrate a new event. For example,

`{
   "identifier":"jurToken",
   "address":"0x602b7a4309b3412d269c6cdddad962c0b94494d8",
   "events":[
      {
         "anonymous":false,
         "inputs":[
            {
               "indexed":true,
               "name":"from",
               "type":"address"
            },
            {
               "indexed":true,
               "name":"to",
               "type":"address"
            },
            {
               "indexed":false,
               "name":"value",
               "type":"uint256"
            }
         ],
         "name":"Transfer",
         "type":"event"
      }
   ]
}`

`identifier` is the identifier used on the platform (polling-service, meassge broker service and jbp) to identify the contract.

`address` is the address of the contract

`events` is the array list of event to watch and their descriptions