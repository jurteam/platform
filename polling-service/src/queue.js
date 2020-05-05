const chalk = require('chalk');
var open = require('amqplib').connect(process.env.CLOUDAMQP_URL);

// Publisher
const publish = (q, data) => open.then((conn) => {
    console.log("[queue] : AMQP connection established")
    return conn.createChannel();
}).then(async (ch) => {
    const ok = await ch.assertQueue(q)
    console.log("[queue] : AMQP Queue asserted")
    const result = ch.sendToQueue(q, Buffer.from(data))
    console.log(chalk.green("[queue] : AMQP Response", result))
    return result
}).catch(chalk.red(console.warn));

module.exports = {
    publish
}