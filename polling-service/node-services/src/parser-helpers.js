const checksum = a => web3.utils.toChecksumAddress(a);
const hasContract = shape => Boolean(shape.contract);
const hasDecodedEvent = shape => Boolean(shape.decodedEvent);

function decodeIfInterested(abi, data, topics) {
  const ev = abi.find(ev => {
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
  return {
    assetName: contract.assetName,
    contractAddress: contract.address,
    decodedEvent: decodeIfInterested(contract.abi, data, topics)
  };
}

function pick(object, keys) {
  return keys.reduce((acc, key) => {
    acc[key] = object[key];
    return acc;
  }, {});
}

function makeResult(result, tx, assetName, contractAddress) {
  return {
    contract_address: contractAddress,
    asset_name: assetName,
    event_name: result.identifier,
    data: pick(result.data, result.fields),
    transaction_hash: tx.transactionHash,
    block_number: tx.blockNumber,
    timestamp: tx.meta.blockTimestamp,
    sender: tx.meta.txOrigin,
  };
}

export default {
  decodeEvent,
  checksum,
  hasContract,
  hasDecodedEvent,
  makeResult,
  pick
};
