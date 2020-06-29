import Parser from "./parser";
import contracts from "../__tests__/contracts.mock.json";
import transactions from "../__tests__/transactions.mock.json";
import parsed from "../__tests__/parsed-transactions.mock.json";
import Web3 from "web3";

beforeAll(() => {
  global.web3 = new Web3();
});

afterAll(() => {
  delete global.web3;
});

describe("Parser", () => {
  it("takes contracts as constuctor arg", () => {
    const parser = new Parser(contracts);

    expect(parser.contracts).toEqual(contracts);
  });

  it("returns contract by address", () => {
    const parser = new Parser(contracts);
    const address = contracts[0].address;
    expect(parser.contractByAddress(address)).toEqual(contracts[0]);
  });

  it("adds contract if present", () => {
    const parser = new Parser(contracts);
    const ev = { address: contracts[0].address, data: null, topics: null };
    const evWithContract = { contract: contracts[0], data: null, topics: null };

    expect(parser.addContract(ev)).toEqual(evWithContract);
  });

  it("parses single tx", () => {
    const parser = new Parser(contracts);
    const notInInterest = transactions[3];
    const inInterest = transactions[1];

    expect(parser.parseTx(notInInterest)).toEqual([]);
    expect(parser.parseTx(inInterest)).toEqual(parsed[1]);
  });

  it("parses multiple transactions", () => {
    const parser = new Parser(contracts);
    const output = parsed
      .filter(v => v.length)
      .reduce((acc, item) => acc.concat(item), []);

    expect(parser.parse([])).toEqual([]);
    expect(parser.parse(transactions)).toEqual(output);
  });
});
