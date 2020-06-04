const smartContracts = require("../config/smart-contracts.json");

const getBlock = block => web3.eth.getBlock(block);

const getTransaction = async txHash => {
  let tx = await web3.eth.getTransactionReceipt(txHash);
  if (tx?.outputs.length > 0) {
    return tx;
  }
};

const hasContract = shape => Boolean(shape.contract);

const hasDecodedEvent = shape => Boolean(shape.decodedEvent);

const checksum = a => web3.utils.toChecksumAddress(a);

const findContractByAddress = address =>
  smartContracts.find(c => checksum(c.address) === checksum(address));

function addContract(ev) {
  return {
    contract: findContractByAddress(ev.address),
    data: ev.data,
    topics: ev.topics
  };
}

function decodeIfInterested(abi, data, topics) {
  const ev = abi.events.find(ev => {
    const evSign = web3.eth.abi.encodeEventSignature(ev);
    return topics.some(t => t === evSign);
  });

  return (
    ev && {
      data: web3.eth.abi.decodeLog(ev.inputs, data, topics),
      identifier: ev.name,
      fields: ev.inputs.map(x => x.name)
    }
  );
}

function decodeEvent({ contract, data, topics }) {
  return {
    contractIdentifier: contract.identifier,
    decodedEvent: decodeIfInterested(contract, data, topics)
  };
}

function makeResult(result, tx, contractIdentifier) {
  result.txHash = tx.transactionHash;
  result.sender = tx.meta.txOrigin;
  result.blockNumber = tx.blockNumber;
  result.timestamp = tx.meta.blockTimestamp;
  result.contractName = contractIdentifier;
  return result;
}

const processTx = tx => {
  return tx?.outputs.reduce((acc, row) => {
    const decodedEvents = row.events
      .map(addContract)
      .filter(hasContract)
      .map(decodeEvent)
      .filter(hasDecodedEvent)
      .map(ev => makeResult(ev.decodedEvent, tx, ev.contractIdentifier));
    return acc.concat(decodedEvents);
  }, []);
};

module.exports = {
  getBlock,
  getTransaction,
  processTx,
  makeResult,
  decodeEvent,
  decodeIfInterested,
  addContract,
  findContractByAddress,
  checksum,
  hasDecodedEvent,
  hasContract
};
