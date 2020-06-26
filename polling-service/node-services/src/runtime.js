import thorifyPkg from "thorify";
const { thorify } = thorifyPkg;
import Web3 from "web3";
import chalk from "chalk";

function defineGlobal(property, value) {
  if (!global[property])
    Object.defineProperty(global, property, {
      value,
      writable: false
    });
}

function init() {
  console.log("starting runtime");
  const web3 = thorify(new Web3(), process.env.THOR_CONNECTION_URL);

  defineGlobal("chalk", chalk);
  defineGlobal("web3", web3);
}

function reset() {
  console.log("removing additions");
}

export default {
  init,
  reset
};
