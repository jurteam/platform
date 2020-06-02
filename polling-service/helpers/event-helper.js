const smartContracts = require("../config/smart-contracts.json");

const getBlock = block => {
  return web3.eth.getBlock(block);
};

const getTransaction = async txHash => {
  let tx = await web3.eth.getTransactionReceipt(txHash);
  if (tx?.outputs.length > 0) {
    return tx
  }
}
const processTx = async tx => {
    let eventsList = [];
    tx?.outputs.forEach(out => {
      out.events.forEach(event => {
        let contract = findContractByAddress(
          event.address
        );
        if (contract != null) {
          let result = decodeEventData(
            contract,
            event.data,
            event.topics
          );
          if (result) {
            result.txHash = tx.address;
            result.sender = tx.meta.txOrigin;
            result.blockNumber = tx.blockNumber;
            result.timestamp = tx.meta.blockTimestamp;
            result.contractName = contract.identifier;
            eventsList.push(result);
          }
        }
      })
    });
    return eventsList;
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
  getTransaction,
  processTx
};
