

const transformer = require('./transformer');

module.exports = {
    async subscribe(identifier, contract, eventName) {

        // Create queue if not exits
        const asserted = await queue.assertQueue(process.env.QUEUE_NAME);

        // Exit the process if queue not asserted
        if (!asserted) {
            process.exit(1);
        }

        // Get the current event's JSON inteface from the contract
        const jsonInterface = contract.options.jsonInterface.find(o => o.name === eventName && o.type === 'event');

        // Get all the fields of data should be filtered from the result
        const fields = jsonInterface.inputs.map(x => x.name);

        // Subscribe to the event based on event name
        contract.events[eventName](async (error, result) => {

            // Error checking
            if (error) {

                // TODO: need to do the right error handling
                console.log(error)
                process.exit(1)
            }

            // If the event have a payload
            if (result) {

                // Push formated data to the queue
                await queue.push(process.env.QUEUE_NAME, transformer.format(identifier, result, fields))

                // Console the info
                console.log(chalk.greenBright.bold('[queue] :'), chalk.blueBright.italic(eventName, chalk.greenBright.bold('successfully stored into queue!')));

            }
        });

        // Log info to console
        console.log(chalk.blue.bold('subscribed to event ') +
            chalk.yellow.italic(eventName) +
            chalk.blue.bold(' of contract ') +
            chalk.yellow.italic(identifier + '(' + contract.options.address + ')'))

    }
}

