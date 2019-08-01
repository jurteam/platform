/* eslint-disable no-unused-vars */
import { log } from "../utils/helpers"; // log helpers

import { thorify } from 'thorify'
import { extend } from 'thorify/dist/extend'
const Web3 = require("web3"); // Recommend using require() instead of import here

// Comet Handler

class CometProvider {
  static provider = null;
  static enableCall = null;

  constructor() {

    console.log('Before init – this.web3 [before]', this.web3);

    // Checking if Thor has been injected by the browser
    if (typeof window.thor !== 'undefined') {
      // Use thor provider
      this.web3 = new Web3(window.thor);
      // Extend web3 to connect to VeChain Blockchain
      extend(this.web3)
    } else {
      // Fall back to default thorified construction
      this.web3 = thorify(new Web3(), "http://localhost:8669");
    }

    window.web3 = this.web3;

    console.log('Before init – this.web3 [after]', this.web3);

    if (window.web3) {
      this.setProvider(window.web3.currentProvider);
      log("CometProvider - constructor", this.provider);
    }
  }

  setProvider(provider) {
    this.provider = provider;
    log("CometProvider - provider", provider);
  }

  // ask for approve
  async auth(onSuccess, onError) {
    // const { enable } = this.provider;
    // eslint-disable-next-line no-undef
    const { enable } = this.provider;
    log("CometProvider", this.provider);
    log("CometProvider", "launching enable()");

    if (typeof enable !== 'undefined') {

      this.enableCall = await enable()
        .then(res => {
          log("CometProvider - enable then", res);
          log("CometProvider - wallet address", res.pop());
          if (typeof onSuccess === "function") {onSuccess(res);}

          return this.provider
        })
        .catch(err => {
          log("CometProvider - enable catch", err);
          if (typeof onError === "function") {onError(err);}
          return err
        }); // promise

      return this.enableCall;
    }

    if (typeof onError === "function") {onError([]);}
    return false;
  }

  // enabled checker
  isEnabled() {
    const { _comet } = this.provider;
    return _comet.isEnabled();
  }

  // approved checker
  isApproved() {
    const { _comet } = this.provider;
    return _comet.isApproved();
  }

  // unlocked checker
  isUnlocked() {
    const { _comet } = this.provider;
    return _comet.isUnlocked();
  }

  // stops all operations
  cancel() {

    // end enable call if defined
    if (
      typeof this.enableCall !== "undefined" &&
      typeof this.enableCall.then === "function"
    )
      this.enableCall.reject();
  }
}

const Comet = new CometProvider();

export default Comet;
