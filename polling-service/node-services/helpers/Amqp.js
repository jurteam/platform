const amqplib = require("amqplib");

const AMQP_CONNECTION_FAILURE = 456;

module.exports = class AMQP {
  constructor(url) {
    this.url = url;
  }

  connect() {
    return amqplib
      .connect(this.url)
      .then(c => c.createChannel())
      .then(channel => {
        this.channel = channel;
        if (process.env.NODE_ENV !== "test")
          console.log("AMQP connected successfully");
        return true;
      })
      .catch(e => {
        console.error("AMQP connection error", e);
        process.exit(AMQP_CONNECTION_FAILURE);
      });
  }

  push(queueName, data) {
    return this.channel.sendToQueue(
      queueName,
      Buffer.from(JSON.stringify(data))
    );
  }

  assertQueue(queueName) {
    return this.channel.assertQueue(queueName).catch(e => {
      console.error("AMQP failed to assert queue", e);
      return false;
    });
  }
};
