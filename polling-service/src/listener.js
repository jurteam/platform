const processor = require('./event.processor.js');

const listen = async (error, result) => {
        if(error) console.log('error', error);

        // Create queue if not exits
        const asserted = await queue.assertQueue(process.env.QUEUE_NAME);

        // Exit the process if queue not asserted
        if (!asserted) {
            process.exit(1);
        }

        let request = await processor.checkBlock(5950875);
        if(request) {
            // console.log("result", request)
            // Push formated data to the queue
            await queue.push(process.env.QUEUE_NAME, request)

            // Console the info
            // console.log(chalk.greenBright.bold('[queue] :'), chalk.blueBright.italic(eventName, chalk.greenBright.bold('successfully stored into queue!')));
        }
        setTimeout(listen, 10000);

}
module.exports = {
    listen
}

