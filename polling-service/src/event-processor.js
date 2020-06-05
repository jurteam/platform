const eventHelper = require("../helpers/event-helper.js");

const findEventInTransaction = async txHash => {
  let tx = await eventHelper.getTransaction(txHash);
  return eventHelper.processTx(tx);
};

const checkBlock = async transactions => {
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
