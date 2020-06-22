const fs = require("fs");
const eventHelper = require("./event-helper");

const BLOCK_RECORD_PATH = "./config/last-consumed-block.json";
const FAILED_TO_GET_BLOCK = 32;

function log(blockNumber) {
  const timestamp = new Date().getTime();
  const content = JSON.stringify({ blockNumber, timestamp });

  return fs.writeFileSync(BLOCK_RECORD_PATH, content);
}

function nextBlockNumber() {
  const blockConfig = JSON.parse(fs.readFileSync(BLOCK_RECORD_PATH));
  return Number.isNaN(Number(blockConfig.blockNumber))
    ? "latest"
    : blockConfig.blockNumber + 1;
}

function next() {
  const blockNumber = nextBlockNumber();

  return new Promise((resolve, reject) => {
    const read = () => eventHelper.getBlock(blockNumber);
    const handle = block => {
      block ? resolve(block) : setTimeout(() => read().then(handle), 5000);
    };
    read()
      .then(handle)
      .catch(e => {
        console.error("failed to get block", blockNumber);
        console.error(e);
        process.exit(FAILED_TO_GET_BLOCK);
      });
  });
}

module.exports = {
  log,
  next,
  nextBlockNumber
};
