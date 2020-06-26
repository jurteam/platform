const checksum = a => web3.utils.toChecksumAddress(a);
const hasContract = shape => Boolean(shape.contract);
const hasDecodedEvent = shape => Boolean(shape.decodedEvent);

function decodeIfInterested(abi, data, topics) {
  const ev = abi.events.find(ev => {
    const evSign = web3.eth.abi.encodeEventSignature(ev);
    return topics.some(t => t === evSign);
  });

  return (
    ev && {
      data: web3.eth.abi.decodeLog(ev.inputs, data, topics.slice(1)),
      identifier: ev.name,
      fields: ev.inputs.map(x => x.name)
    }
  );
}

function decodeEvent({ contract, data, topics }) {
  console.log("decoding event for", contract, data);
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

export default {
  decodeEvent,
  checksum,
  hasContract,
  hasDecodedEvent,
  makeResult
};
