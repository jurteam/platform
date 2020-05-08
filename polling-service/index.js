// Require the framework and instantiate it
const dotEnv = require('dotenv');
const thorify = require('thorify').thorify;
const Web3 = require('web3');
const chalk = require('chalk');
const listener = require('./src/listener');
const Amqp = require('./helpers/Amqp');

// configure DotEnv
dotEnv.config()

const start = async () => {

    // Make chalk available to public
    Object.defineProperty(global, 'chalk', {
        value: chalk,
        writable: false
    });

    // Setup AMQP provide
    const queue = new Amqp(process.env.CLOUDAMQP_URL);

    // Connect to AMQP server
    await queue.connect();

    // Make queue available to public
    Object.defineProperty(global, 'queue', {
        value: queue,
        writable: false
    });

    // Make web3 available to public
    Object.defineProperty(global, 'web3', {
        value: thorify(new Web3(), process.env.THOR_CONNECTION_URL),
        writable: false
    });

    // Listen to the smart-contract events!
    listener.listen();

}

// start application
start();