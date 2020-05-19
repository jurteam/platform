const mapFields = (data, filelds) => {
    let dataMap = new Map(Object.entries(data));
    let objMap = {};
    filelds.forEach(x => {
        objMap[x] = dataMap.get(x);
    });
    return objMap;
}

const format = (result) => {
    return {
        assetIdentifier: result.contractName,
        eventIdentifier: result.identifier,
        data: mapFields(result.data, result.fields),
        transaction: {
            address: result.txHash,
            blockNumber: result.blockNumber,
            timestamp:result.timestamp,
            sender:result.sender
        },
    };
}

module.exports = {
    format
}