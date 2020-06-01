const fs = require("fs");
const eventHelper = require("./event-helper");

const BLOCK_RECORD_PATH = "./config/last-consumed-block.json";

function log(blockNumber) {
  const timestamp = new Date().getTime();
  const content = JSON.stringify({ blockNumber, timestamp });

  return fs.writeFileSync(BLOCK_RECORD_PATH, content);
}

function next() {
  const blockConfig = JSON.parse(fs.readFileSync(BLOCK_RECORD_PATH));
  const nextBlockNumber = Number.isNaN(Number(blockConfig.blockNumber))
    ? "latest"
    : blockConfig.blockNumber + 1;

  return new Promise((resolve, reject) => {
    const read = () => eventHelper.getBlock(nextBlockNumber);
    const handle = block => {
      // console.log("next.handle", !!block, nextBlockNumber);
      block ? resolve(block) : setTimeout(() => read().then(handle), 5000);
    };
    read().then(handle);
  });
}

module.exports = {
  log,
  next
};
