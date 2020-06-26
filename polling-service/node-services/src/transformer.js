const mapFields = (data, filelds) => {
  let dataMap = new Map(Object.entries(data));
  let objMap = {};
  filelds.forEach(x => {
    objMap[x] = dataMap.get(x);
  });
  return objMap;
};

function format(result, contractAddress) {
  return {
    contractAddress,
    assetName: result.contractName,
    eventName: result.identifier,
    data: mapFields(result.data, result.fields),
    transaction: {
      address: result.txHash,
      blockNumber: result.blockNumber,
      timestamp: result.timestamp,
      sender: result.sender
    }
  };
}

export default {
  format
};
