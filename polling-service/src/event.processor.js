const eventHelper = require('./event.helper.js');

const checkBlock = async (blockNumber) => {
    let transactions = await eventHelper.getBlock(blockNumber);
    if(transactions) {
        let requests = [];
        for(let i = 0; i < transactions.length; i++) {
            let res = await eventHelper.findEventInTransaction(transactions[i])
            if(res != null) {
                requests.push(res)
            }
        }
        if(requests.length >0) {
            return requests
        }
    }
}

module.exports = {
    checkBlock
}