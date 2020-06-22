// Require the framework and instantiate it
const runtime = require("./runtime");
const listener = require("./src/listener");

const start = async () => {
  runtime.configure();
  await queue.connect();

  return listener.listen();
};

start();
