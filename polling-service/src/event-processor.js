const eventHelper = require("../helpers/event-helper.js");

const findEventInTransaction = async txHash => {
  let res = await web3.eth.getTransactionReceipt(txHash);
  if (res.outputs.length > 0) {
    let eventsList = [];
    for (let i = 0; i < res.outputs.length; i++) {
      let event = res.outputs[i].events;
      if (event && event.length > 0) {
        for (let j = 0; j < event.length; j++) {
          let contract = eventHelper.findContractByAddress(
            res.outputs[i].events[j].address
          );
          if (contract != null) {
            let result = eventHelper.decodeEventData(
              contract,
              res.outputs[i].events[j].data,
              res.outputs[i].events[j].topics
            );
            if (result) {
              result.txHash = txHash;
              result.sender = res.meta.txOrigin;
              result.blockNumber = res.blockNumber;
              result.timestamp = res.meta.blockTimestamp;
              result.contractName = contract.identifier;
              eventsList.push(result);
            }
          }
        }
      } else return null;
    }
    // console.log("[polling-service-event-helper] Event List", eventsList)
    return eventsList;
  } else return null;
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
