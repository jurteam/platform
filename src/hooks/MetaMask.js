/* eslint-disable no-unused-vars */
import { log } from "../utils/helpers"; // log helpers

// MetaMask Handler
// -----------------------------------
// ATTENTION: In an effort to improve user privacy, MetaMask stopped exposing user accounts to dapps if "privacy mode" is enabled on November 2nd, 2018.
//            Dapps should now call provider.enable() in order to view and use accounts.
//            Please see https://bit.ly/2QQHXvF for complete information and up-to-date example code.

class MetaMaskProvider {
  static provider = null;

  setProvider(provider) {
    this.provider = provider;
    const {connection} = this.provider;
    log('provider', connection.enable());
  }

  // ask for approve
  auth() {
    const { connection } = this.provider;
    return connection.enable(); // promise
  }

  // enabled checker
  isEnabled() {
    const { connection } = this.provider;
    const { _metamask } = connection;
    return _metamask.isEnabled();
  }

  // approved checker
  isApproved() {
    const { connection } = this.provider;
    const { _metamask } = connection;
    return _metamask.isApproved();
  }

  // unlocked checker
  isUnlocked() {
    const { connection } = this.provider;
    const { _metamask } = connection;
    return _metamask.isUnlocked();
  }
}

const MetaMask = new MetaMaskProvider();

export default MetaMask;
