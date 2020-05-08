const amqplib = require('amqplib');

module.exports = class AMQP {

    constructor(url) {
        this.url = url;
    }

    async connect() {
        try {

            // Connect to AMQP server
            let conn = await amqplib.connect(this.url);

            // Create channel for communication
            this.channel = await conn.createChannel();

            // Console info
            console.log(chalk.green.bold("AMQP connection established successfully!"));

        } catch (error) {

            // Console error information
            console.error(chalk.red('[Amqp] :connection error'), error);

            // exit the process
            process.exit(1);
        }
    }

    push(queueName, data) {

        // Send data to queue
        return this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));

    }

    async assertQueue(queueName) {

        let asserted = false;

        try {
            // Create the queue if not exist in the server
            asserted = await this.channel.assertQueue(queueName);
        } catch (error) {
            // Log error info
            console.error(chalk.red('[Amqp] : Asserting queue error'), err);
        }

        return asserted;

    }

}