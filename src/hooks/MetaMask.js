/* eslint-disable no-unused-vars */
import { log } from "../utils/helpers"; // log helpers

// MetaMask Handler
// -----------------------------------
// ATTENTION: In an effort to improve user privacy, MetaMask stopped exposing user accounts to dapps if "privacy mode" is enabled on November 2nd, 2018.
//            Dapps should now call provider.enable() in order to view and use accounts.
//            Please see https://bit.ly/2QQHXvF for complete information and up-to-date example code.

class MetaMaskProvider {
  static provider = null;
  static enableCall = null;

  constructor() {
    if (window.web3) {
      this.provider = window.web3.currentProvider;
      log("MetaMaskProvider - constructor", this.provider);
    }
  }

  setProvider(provider) {
    this.provider = provider;
    log("MetaMaskProvider - provider", provider);
  }

  // ask for approve
  async auth(onSuccess, onError) {
    const { enable } = this.provider;
    log("MetaMaskProvider", "enable()");
    this.enableCall = await enable()
      .then(res => {
        log("MetaMaskProvider - enable then", res);
        if (typeof onSuccess === "function") {onSuccess(res);}
      })
      .catch(err => {
        log("MetaMaskProvider - enable catch", err);
        if (typeof onError === "function") {onError(err);}
      }); // promise

    return this.enableCall;
  }

  // enabled checker
  isEnabled() {
    const { _metamask } = this.provider;
    return _metamask.isEnabled();
  }

  // approved checker
  isApproved() {
    const { _metamask } = this.provider;
    return _metamask.isApproved();
  }

  // unlocked checker
  isUnlocked() {
    const { _metamask } = this.provider;
    return _metamask.isUnlocked();
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

const MetaMask = new MetaMaskProvider();

export default MetaMask;
