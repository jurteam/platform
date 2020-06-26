import runtime from "./src/runtime.js";
import blockchain from "./src/blockchain.js";
import Parser from "./src/parser.js";
import Producer from "./src/producer.js";

import rtr from "./src/rtr.js";

const RTR_FAILED = 32;

rtr(runtime, Producer, blockchain, Parser).catch(e => {
  console.error("rtr failed", new Date());
  console.error(e);
  process.exit(RTR_FAILED);
});
