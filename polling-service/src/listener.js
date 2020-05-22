const processor = require('./event.processor.js');
const blockFilePath = '../config/currentBlock.json';
const blockConfig = require(blockFilePath);
const transformer = require('./transformer');
const QUEUE_NAME = 'blockchain-events';
const fs = require('fs').promises;

const listen = async (error, result) => {
        if(error) console.log('error', error);

        // Create queue if not exits
        const asserted = await queue.assertQueue(QUEUE_NAME);

        // Exit the process if queue not asserted
        if (!asserted) {
            process.exit(1);
        }
        let currentBlock = blockConfig.currentBlock
        console.log("[polling-service-listener] Processing block", currentBlock)
        let response = await processor.checkBlock(currentBlock);
        if(response) {
            for(let i = 0; i <response.length; i++) {
                console.log(chalk.greenBright.bold("[polling-service-listener] Transaction found, writing to queue", JSON.stringify(transformer.format(response[i]))))
                // Push formated data to the queue
                // await queue.push(QUEUE_NAME, transformer.format(response[i]))
            }
        }
        blockConfig.currentBlock = currentBlock+1;
        await fs.writeFile('./config/currentBlock.json', JSON.stringify(blockConfig), {encoding:'utf8',flag:'w'})
        setTimeout(listen, 10000);

}
module.exports = {
    listen
}

