const AMQP = require("./Amqp");

const mockMessage = { hello: "Test World" };

describe("AMQP", () => {
  it("won't push without connecting", () => {
    const amqp = new AMQP();
    return expect(() => amqp.push("test text")).toThrow(TypeError);
  });

  it("connects to rabbit", () => {
    const amqp = new AMQP(process.env.CLOUDAMQP_URL);
    return expect(amqp.connect()).resolves.toBeTruthy();
  });

  const queueName = "test-queue" + Math.log(new Date().getTime());
  it("asserts a queue " + queueName, async () => {
    const amqp = new AMQP(process.env.CLOUDAMQP_URL);
    await amqp.connect();
    return expect(amqp.assertQueue(queueName)).resolves.toBeTruthy();
  });

  it("pushes messages to queue " + queueName, async () => {
    const amqp = new AMQP(process.env.CLOUDAMQP_URL);
    await amqp.connect();
    await amqp.assertQueue(queueName);
    return expect(amqp.push(queueName, mockMessage)).toBeTruthy();
  });
});
