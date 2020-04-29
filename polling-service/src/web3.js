const thorify = require("thorify").thorify;
const Web3 = require("web3");
const web3 = thorify(new Web3(), process.env.THOR_CONNECTION_URL);

module.exports = web3