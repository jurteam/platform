import parserHelpers from "./parser-helpers.js";

const {
  checksum,
  decodeEvent,
  hasContract,
  hasDecodedEvent,
  makeResult
} = parserHelpers;

export default class Parser {
  constructor(contracts) {
    this.contracts = contracts;
    if (!this.contracts || this.contracts.length < 1) {
      console.warn(
        "No contracts to parse. That is, we don't have interest in any asset"
      );
    }
  }

  contractByAddress(address) {
    return this.contracts.find(c => checksum(c.address) === checksum(address));
  }

  addContract(ev) {
    return {
      contract: this.contractByAddress(ev.address),
      data: ev.data,
      topics: ev.topics
    };
  }

  parseTx(tx) {
    return tx.outputs.reduce((acc, row) => {
      const decodedEvents = row.events
        .map(ev => this.addContract(ev))
        .filter(hasContract)
        .map(decodeEvent)
        .filter(hasDecodedEvent)
        .map(ev =>
          makeResult(ev.decodedEvent, tx, ev.assetName, ev.contractAddress)
        );
      return acc.concat(decodedEvents);
    }, []);
  }

  parse(transactions) {
    return transactions.reduce((acc, tx) => acc.concat(this.parseTx(tx)), []);
  }
}
