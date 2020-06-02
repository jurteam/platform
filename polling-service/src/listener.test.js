const runtime = require("../runtime");
const listener = require("./listener");
const { listen, transactionsToQueue, pushToQueue, processNext } = listener;

const mockEvent = { assetidentifier: "Test 1" };
const mockTransactions = [
  [
    { data: {}, contractName: "Test 2", fields: [] },
    { data: {}, contractName: "Test 3", fields: [] }
  ]
];

describe("Listner", () => {
  runtime.configure();

  it("checks all exports are functions", () => {
    expect(typeof listen).toBe("function");
    expect(typeof transactionsToQueue).toBe("function");
    expect(typeof pushToQueue).toBe("function");
    expect(typeof processNext).toBe("function");
  });

  it("pushes an message to queue", () => {
    return expect(
      queue.connect().then(_ => pushToQueue(mockEvent))
    ).resolves.toBeTruthy();
  });

  it("is safe on empty arguments", () => {
    expect(transactionsToQueue).not.toThrow();
  });

  it("can send multiple messages to queue", () => {
    expect(() => transactionsToQueue(mockTransactions)).not.toThrow();
  });
});
