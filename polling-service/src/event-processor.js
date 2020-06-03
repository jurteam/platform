const eventHelper = require("../helpers/event-helper.js");

const findEventInTransaction = async txHash => {
  let tx = await eventHelper.getTransaction(txHash);
  return await eventHelper.processTx(tx); 
};

const checkBlock = async transactions => {
  // let transactions = await eventHelper.getBlock(blockNumber);
  if (transactions) {
    let requests = [];
    for (let i = 0; i < transactions.length; i++) {
      let res = await findEventInTransaction(transactions[i]);
      if (res != null) {
        requests.push(res);
      }
    }
    if (requests.length > 0) {
      return requests;
    }
  }
};

module.exports = {
  checkBlock
};
