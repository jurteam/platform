const processor = require('./event.processor.js');
const eventHelper = require('./event.helper.js');
const blockFilePath = '../config/currentBlock.json';
const blockConfig = require(blockFilePath);
const transformer = require('./transformer');
const QUEUE_NAME = 'blockchain-events';
const fs = require('fs').promises;
var READ_BLOCK_TIMEOUT = 10000

const listen = async (error, result) => {
        if(error) console.log('error', error);
        console.log("Timeout is:",READ_BLOCK_TIMEOUT);
        setTimeout(listen, READ_BLOCK_TIMEOUT);

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
            for(let i = 0; i < response.length; i++) {
                for(let j = 0; j < response[i].length; j++) {
                    console.log(chalk.greenBright.bold("[polling-service-listener] Transaction found, writing to queue", JSON.stringify(transformer.format(response[i][j]))))
                    await queue.push(QUEUE_NAME, transformer.format(response[i][j]))
                }
            }
        }
        blockConfig.currentBlock = currentBlock+1;
        await fs.writeFile('./config/currentBlock.json', JSON.stringify(blockConfig), {encoding:'utf8',flag:'w'})

        if(await eventHelper.getLatestBlock() - currentBlock > 2) {
            READ_BLOCK_TIMEOUT = 1000;
        } else READ_BLOCK_TIMEOUT = 10000;

}
module.exports = {
    listen
}

