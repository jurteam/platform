import helpers from "./parser-helpers.js";
import Web3 from "web3";
const { pick, hasContract, hasDecodedEvent, makeResult, checksum } = helpers;

describe("Parser helpers", () => {
  it("creates object from source and keys", () => {
    const source = {
      hello: "world",
      star: "wars",
      han: null,
      luke: "skywalker",
      dark: ["Darth Vader", "Kylo Ren"]
    };

    const keysOfinterest = ["dark", "han", "princess"];

    const result = {
      dark: ["Darth Vader", "Kylo Ren"],
      han: null,
      princess: undefined
    };

    expect(pick(source, keysOfinterest)).toEqual(result);
  });

  it("gives true for objects with contract property", () => {
    const withContract = { contract: {} };
    const withoutContract = {};

    expect(hasContract(withContract)).toBe(true);
    expect(hasContract(withoutContract)).toBe(false);
  });

  it("gives true for objects with decodedEvent property", () => {
    const withEvent = { decodedEvent: {} };
    const withoutEvent = {};

    expect(hasDecodedEvent(withEvent)).toBe(true);
    expect(hasDecodedEvent(withoutEvent)).toBe(false);
  });

  it("gives same checksum for same input", () => {
    global.web3 = new Web3();
    const first = "0xE3DF6d92821d0911b59F2c4F0FaF09A7F7cB54dD".toLocaleLowerCase();
    const firstChecksum = "0xE3DF6d92821d0911b59F2c4F0FaF09A7F7cB54dD";
    const second = "0xe3Df6d92821d0911b59F2c4f0FaF09A7F7cB54dd";

    expect(checksum(first)).toBe(firstChecksum);
    expect(checksum(first) === checksum(second)).toBe(true);
    delete global.web3;
  });

  it("make result object from inputs", () => {
    const event = {
      data: {},
      fields: [],
      identifier: "MyTestEvent"
    };
    const tx = {
      transactionHash: "test-transaction-hash",
      blockNumber: 1234,
      meta: {
        blockTimestamp: 12340,
        txOrigin: "some-wallet-address"
      }
    };
    const assetName = "MyTestAsset";
    const contactAddress = "some-contract-test-address";

    const output = {
      event_name: "MyTestEvent",
      contract_address: "some-contract-test-address",
      asset_name: "MyTestAsset",
      data: {},
      transaction_hash: "test-transaction-hash",
      block_number: 1234,
      timestamp: 12340,
      sender: "some-wallet-address"
    };

    expect(makeResult(event, tx, assetName, contactAddress)).toEqual(output);
  });
});
