import React, { Component } from "react";
import MetaMask from "../../hooks/MetaMask"; // MetaMask hook

class Unlock extends Component {
  constructor(props) {
    super(props);

    this.unlock = this.unlock.bind(this);
  }

  unlock() {
    MetaMask.auth();
  }

  render() {
    return (
      <p>
        Please
        <a href="https://metamask.io/" onClick={(e) => {e.preventDefault(); this.unlock();}} style={{ marginLeft: "10px" }}>
          unlock MetaMask
        </a>
      </p>
    );
  }
}

export default Unlock;
