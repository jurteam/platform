// Require the framework and instantiate it
const dotEnv = require("dotenv");
const thorify = require("thorify").thorify;
const Web3 = require("web3");
const chalk = require("chalk");
const Amqp = require("./helpers/Amqp");

dotEnv.config();

function configure() {
  const queue = new Amqp(process.env.CLOUDAMQP_URL);
  const web3 = thorify(new Web3(), process.env.THOR_CONNECTION_URL);

  defineGlobal("chalk", chalk);
  defineGlobal("queue", queue);
  defineGlobal("web3", web3);
}

function defineGlobal(property, value) {
  if (!global[property])
    Object.defineProperty(global, property, {
      value,
      writable: false
    });
}

module.exports = { configure, defineGlobal };
