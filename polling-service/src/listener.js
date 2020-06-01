const blockchainEventsQueue = require("../helpers/blockchain-events-queue");
const blockHelper = require("../helpers/block-helper");
const processor = require("./event-processor.js");
const transformer = require("./transformer");

const LISTEN_FAILURE = 234;

function listen() {
  return blockchainEventsQueue
    .assert()
    .then(processNext)
    .then(listen)
    .catch(e => {
      console.log("failed to listen", e);
      process.exit(LISTEN_FAILURE);
    });
}

async function processNext() {
  const block = await blockHelper.next();
  console.log(
    "consiming block",
    block.number,
    "time",
    new Date().toLocaleString()
  );
  const response = await processor.checkBlock(block.transactions);

  blockHelper.log(block.number);
  transactionsToQueue(response);
}

function transactionsToQueue(response) {
  response?.forEach(row => row.forEach(pushToQueue));
}

function pushToQueue(data) {
  const message = transformer.format(data);
  console.log(
    chalk.greenBright.bold(
      "transaction found, writing to queue",
      JSON.stringify(message)
    )
  );
  blockchainEventsQueue.push(message);
}

module.exports = {
  listen,
  transactionsToQueue,
  pushToQueue,
  processNext
};
