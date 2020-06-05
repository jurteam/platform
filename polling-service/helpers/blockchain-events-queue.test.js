const beq = require("./blockchain-events-queue");
const runtime = require("../runtime");

const mockEvent = { assetIdentifier: "Test" };

describe("Blockchain Events Queue", () => {
  runtime.configure();
  it("asserts blockchain-events queue", async () => {
    await queue.connect();
    return expect(beq.assert()).resolves.toBeTruthy();
  });

  it("push to blockchain-events queue", () => {
    return expect(beq.push(mockEvent)).toBeTruthy();
  });
});
