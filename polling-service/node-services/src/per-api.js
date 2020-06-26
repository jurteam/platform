import fastify from "fastify";
import blockchain from "./blockchain.js";
import Parser from "./parser.js";
const server = fastify({ logger: true });
const PORT = process.env.PER_PORT || 3000;

const createServer = () => {
  server.post("/blocks/:blockNumber", (request, response) => {
    const { instanceId, contracts } = request.body;
    const parser = new Parser(contracts);
    blockchain
      .block(request.params.blockNumber)
      .then(blockchain.transactions)
      .then(receipts => parser.parse(receipts))
      .then(txData => {
        return { data: txData };
      })
      .then(data => response.code(200).send(data))
      .catch(e => {
        response.code(400).send(e);
      });
  });

  server.post("/tx/:transactionHash", (request, response) => {
    const { contracts } = request.body;
    const parser = new Parser(contracts);
    blockchain
      .receipt(request.params.transactionHash)
      .then(receipts => parser.parseTx(receipts))
      .then(txData => {
        return { data: txData };
      })
      .then(data => response.code(200).send(data))
      .catch(e => {
        response.code(400).send(e);
      });
  });

  server.listen(PORT, err => {
    if (err) {
      server.log.error(err);
      process.exit(32);
    }
  });
};

export default {
  createServer
};
