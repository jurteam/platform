import fastify from "fastify";
import blockchain from "./blockchain.js";
import Parser from "./parser.js";
const server = fastify();
const PORT = process.env.PER_PORT || 3000;
import schema from "./schema/schema.js";
const PER_SERVER_FAILED = 26;

const createServer = () => {
  server.post(
    "/blocks/:blockNumber",
    schema.blockSchema,
    (request, response) => {
      const { contracts } = request.body;
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
          console.error(e);
          response.code(400).send(e);
        });
    }
  );

  server.post("/tx/:transactionHash", schema.txSchema, (request, response) => {
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
        console.error(e);
        response.code(400).send(e);
      });
  });

  server.listen( PORT, '0.0.0.0', err => {
    if (err) {
      console.error("[per-failure-server]", new Date());
      console.error(err);
      process.exit(PER_SERVER_FAILED);
    }
    console.info(
      `server listening on ${server.server.address().address}:${
        server.server.address().port
      }`
    );
  });
};

export default {
  createServer
};
