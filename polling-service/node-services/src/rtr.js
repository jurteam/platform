export default async function rtr(runtime, Producer, blockchain, Parser) {
  runtime.init();
  const producer = new Producer();
  const config = await producer.init();
  const parser = new Parser(config.contracts);

  return consumeChain(config.nextBlockNumber);

  function consumeChain(blockNumber) {
    return blockchain
      .block(blockNumber)
      .then(blockchain.transactions)
      .then(receipts => parser.parse(receipts))
      .then(data => producer.send({ blockNumber, data }))
      .then(res => consumeChain(res.nextBlockNumber));
  }
}
