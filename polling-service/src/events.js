const web3 = require('./web3')
const queue = require('./queue.js');
const chalk = require('chalk');

var blockCounter = new Set()
var eventData = new Map()
var eventBlocks = new Set()


const subscribeLogEvent = (assetIdentifier, contract, eventName) => {
  const eventJsonInterface = web3.utils._.find(
    contract._jsonInterface,
    o => o.name === eventName && o.type === 'event',
  )
  var options = {
    fromBlock: 0,
    toBlock: 'latest',
    address: contract.address,
    topics: [eventJsonInterface.signature, null, null]
  };
  const subscription = web3.eth.subscribe('logs', options, (result, error) => {
      if(error) { console.log(chalk.red.bold(error))}
  })
  
  subscription.on('data', async (result, error) => {
    if(!error) {
        //The event is received twice, the workaround limits it to reading only once
        let blockNumber = result.meta.blockNumber
        if (eventBlocks.has(blockNumber)) { return }

        console.log(chalk.blue.bold("[events] : Incoming transaction"))
          const eventObj = await web3.eth.abi.decodeLog(
              eventJsonInterface.inputs,
              result.data,
              result.topics.slice(1)
          )
          console.log(chalk.blue.bold("[events] : Found event"), eventObj)

          eventData.set("assetIdentifier", assetIdentifier)
          eventData.set("transaction", result)
          eventData.set("eventIdentifier", eventName)
          eventData.set("eventData", eventObj)
          console.log(chalk.yellow.bold("[events] : Publishing to queue"), JSON.stringify(Array.from( eventData.entries())))
          queue.publish(assetIdentifier, JSON.stringify(Array.from( eventData.entries())))
          .then((result) => {
            eventBlocks.add(blockNumber)
          })

    } else console.log(chalk.red.bold("Error: ", error))
  });
  // subscribedEvents[eventName] = subscription
  console.log(chalk.blue.bold(`[events] : subscribed to event '${eventName}' of contract '${contract.options.address}' `))

}

const unsubscribeEvent = (eventName) => {
    subscribedEvents[eventName].unsubscribe(function(error, success){
        if(success)
            console.info('Successfully unsubscribed!');
    });
}

module.exports = {
  subscribeLogEvent,
  unsubscribeEvent
}