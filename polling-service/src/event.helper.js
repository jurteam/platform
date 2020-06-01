const smartContracts = require("../config/smart-contracts.json");

const getBlock = async block => {
  const res = await web3.eth.getBlock(block);
  if (res && res.transactions.length > 0) {
    return res.transactions;
  }
};

const getLatestBlock = async () => {
  let block = await web3.eth.getBlock('latest');
  if(block) {
    return block.number;
  }
}

const findEventInTransaction = async txHash => {
  let res = await web3.eth.getTransactionReceipt(txHash);
  if (res.outputs.length > 0) {
    let eventsList = [];
    for (let i = 0; i < res.outputs.length; i++) {
      let event = res.outputs[i].events;
      if (event && event.length > 0) {
        for (let j = 0; j < event.length; j++) {
          let contract = findContractByAddress(
            res.outputs[i].events[j].address
          );
          if (contract != null) {
            let result = decodeEventData(
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
              eventsList.push(result)
            }
          }
        }
      } else return null;
    }
    // console.log("[polling-service-event-helper] Event List", eventsList)
    return eventsList
  } else return null;
};

const decodeEventData = (abi, data, topics) => {
  for (let i = 0; i < abi.events.length; i++) {
    if (web3.eth.abi.encodeEventSignature(abi.events[i]) === topics[0]) {
      topics.shift();
      return {
        data: web3.eth.abi.decodeLog(abi.events[i].inputs, data, topics),
        identifier: abi.events[i].name,
        fields: abi.events[i].inputs.map(x => x.name)
      };
    }
  }
};

const findContractByAddress = address => {
  let contract = null;
  smartContracts.forEach(con => {
    if (
      web3.utils.toChecksumAddress(con.address) ===
      web3.utils.toChecksumAddress(address)
    ) {
      contract = con;
    }
  });
  return contract;
};

module.exports = {
  getBlock,
  getLatestBlock,
  findEventInTransaction
};
