const blockHelper = require("./block-helper");
const runtime = require("../runtime");

const logBlockNumber = process.env.TEST_BLOCK_NUMBER || 123456;
const readBlockNumber = logBlockNumber + 1;

describe("Block Helper", () => {
  it("logs a block number", () => {
    expect(() => blockHelper.log(logBlockNumber)).not.toThrow();
  });

  it("reads the next block number", () => {
    expect(blockHelper.nextBlockNumber()).toBe(readBlockNumber);
  });

  runtime.configure();
  it("reads the next block", () => {
    return expect(blockHelper.next()).resolves.toBeTruthy();
  });

  it("reads the 'best' (latest) block", () => {
    blockHelper.log("latest");
    return expect(blockHelper.next()).resolves.toBeTruthy();
  });
});
