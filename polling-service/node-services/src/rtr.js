export default async function rtr(runtime, producer, blockchain, Parser) {
  runtime.init();
  const config = await producer.getConfig();
  const parser = new Parser(config.contracts);

  return consumeChain(config.nextBlockNumber);

  function consumeChain(blockNumber) {
    return blockchain
      .block(blockNumber)
      .then(blockchain.transactions)
      .then(receipts => parser.parse(receipts))
      .then(data => producer.postEvent({ blockNumber, data }))
      .then(res => consumeChain(res.nextBlockNumber));
  }
}
