const eventHelper = require('./event.helper.js');

const checkBlock = async (blockNumber) => {
    let transactions = await eventHelper.getBlock(blockNumber);
    if(transactions.length > 0) {
        let requests = [];
        for(let i = 0; i < transactions.length; i++) {
            let res = await eventHelper.findEventInTransaction(transactions[i])
            if(res != null) {
                requests.push(res)
            }
        }
        return requests
    }
}

module.exports = {
    checkBlock
}