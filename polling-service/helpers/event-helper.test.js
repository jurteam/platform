const eventHelper = require("./event-helper");
const transactionsMock = require("../__tests__/transactions.mock.json");
const runtime = require("../runtime");

beforeAll(() => {
  runtime.configure();
});

describe("Event Helper", () => {
  it("checks if all exports are functions", () => {
    Object.values(eventHelper).forEach(f => expect(typeof f).toBe("function"));
  });

  it("gets transaction", () => {
    return expect(
      eventHelper.getTransaction(transactionsMock[1].transactionHash)
    ).resolves.toBeTruthy();
  });

  it("doesn't get transaction", () => {
    return expect(
      eventHelper.getTransaction(transactionsMock[7].transactionHash)
    ).resolves.toBeUndefined();
  });

  it("finds contract by address", () => {
    expect(
      eventHelper.findContractByAddress(
        transactionsMock[6].outputs[0].events[0].address
      )
    ).toBeTruthy();
  });

  it("processes an undefined (transaction)", () => {
    expect(eventHelper.processTx(undefined)).toBeUndefined();
  });

  it("processes a reverted transaction", () => {
    expect(eventHelper.processTx(transactionsMock[7]).length).toBe(0);
  });

  it("processes a not interested transaction", () => {
    expect(eventHelper.processTx(transactionsMock[3]).length).toBe(0);
  });

  it("processes an interested interested transaction", () => {
    const result = eventHelper.processTx(transactionsMock[6]);
    expect(result.length).toBe(3);
  });

  it("processes all interested transactions", () => {
    transactionsMock
      .filter((_, i) => [0, 1, 2, 6].includes(i))
      .map(t => {
        const r = eventHelper.processTx(t);
        console.log(r);
        return r;
      })
      .forEach(t => expect(t.length).toBeGreaterThan(1));
  });

  it("processes all non interested transactions", () => {
    transactionsMock
      .filter((_, i) => ![0, 1, 2, 6].includes(i))
      .forEach(t => expect(eventHelper.processTx(t).length).toBe(0));
  });

  // TODO: Check shape of processTx output
});
