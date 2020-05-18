const mapFields = (data, filelds) => {
    let dataMap = new Map(Object.entries(data));
    let objMap = {};
    filelds.forEach(x => {
        objMap[x] = dataMap.get(x);
    });
    return objMap;
}

const format = (identifier, data, filelds) => {
    return {
        assetIdentifier: identifier,
        eventIdentifier: data.event,
        data: mapFields(data.returnValues, filelds),
        transaction: {
            address: data.address,
            meta: data.meta
        },
    };
}

module.exports = {
    format
}