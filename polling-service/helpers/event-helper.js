const smartContracts = require("../config/smart-contracts.json");

const getBlock = block => {
  return web3.eth.getBlock(block);
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
  decodeEventData,
  findContractByAddress
};
