function block(number) {
  console.log("going to read block", number, "at", new Date());
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
  return Promise.resolve([]);
}

function receipt(txHash) {
  return new Promise((resolve, reject) => {
    web3.eth
      .getTransactionReceipt(txHash)
      .then(tx => (tx ? resolve(tx) : reject(e)))
      .catch(e => {
        console.error("failed to get transaction", txHash);
        console.error(e);
        return reject(e);
      });
  });
}

function hasOutputs(tx) {
  return tx?.outputs.length > 0;
}

export default {
  block,
  transactions,
  receipt
};
