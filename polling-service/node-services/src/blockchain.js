function block(number) {
  console.log("going to read block", number);
  return new Promise((resolve, reject) => {
    const read = () => web3.eth.getBlock(number);
    const handle = block => {
      block ? resolve(block) : setTimeout(() => read().then(handle), 5000);
    };

    read()
      .then(handle)
      .catch(e => {
        console.error("failed to get block", number);
        console.error(e);
        return reject(e);
      });
  });
}

function transactions(block) {
  if (block.transactions?.length)
    return Promise.all(block.transactions.map(receipt)).then(receipts =>
      receipts.filter(hasOutputs)
    );
  return [];
}

function receipt(txHash) {
  return web3.eth.getTransactionReceipt(txHash);
}

function hasOutputs(tx) {
  return tx?.outputs.length > 0;
}

export default {
  block,
  transactions
};
