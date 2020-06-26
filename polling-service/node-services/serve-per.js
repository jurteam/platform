import fastify from "fastify";
import runtime from "./src/runtime.js";
import server from "./src/per-api.js";

const PER_FAILED = 32;

const serve = async () => {
  try {
    await runtime.init();
    await server.createServer();
  } catch (e) {
    console.error("[per-failure]", new Date());
    console.error(e);
    process.exit(PER_FAILED);
  }
};

serve();
