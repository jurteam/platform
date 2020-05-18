const smartContracts = require('../config/smart-contracts.json');

const getBlock = async (block) => {
    const res = await web3.eth.getBlock(block);
    if(res.transactions.length > 0) {
        return res.transactions;
    }
}

const findEventInTransaction = async (txHash) => {
    let res = await web3.eth.getTransactionReceipt(txHash)
    if(res.outputs.length > 0) {
        for(let i = 0; i < res.outputs.length; i++) {
            let event = res.outputs[i].events;
            if(event.length > 0) {
                for(let j = 0; j < event.length; j++) {
                    let contract = findContractByAddress(res.outputs[i].events[j].address)
                    if(contract != null) {
                        let result = decodeEventData(contract, res.outputs[i].events[j].data, res.outputs[i].events[j].topics);
                        result.txHash = txHash
                        result.sender = res.meta.txOrigin
                        result.blockNumber = res.blockNumber
                        result.timestamp = res.meta.blockTimestamp
                        result.contractName = contract.identifier
                        return result 
                    }
                }
            } else return null
        }
    } else return null
}

const decodeEventData = (abi, data, topics) => {
    let encoded = null
    for(let i = 0; i < abi.events.length; i++) {
        if(web3.eth.abi.encodeEventSignature(abi.events[i]) === topics[0]) {
            encoded = topics[0]
            return {
                data: web3.eth.abi.decodeLog(abi.events[i].inputs, data, topics),
                identifier: abi.events[i].name,
            }
        }
    }
}

const findContractByAddress = (address) => {
    let contract = null
    smartContracts.forEach(con => {
      if (con.address === address) { contract = con }
    });
    return contract
}

module.exports = {
    getBlock,
    findEventInTransaction,
}