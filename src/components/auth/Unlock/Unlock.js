import React, { Component } from "react";  // eslint-disable-next-line no-unused-vars
import MetaMask from "../../../hooks/MetaMask"; // MetaMask hook
import Button from "../../../components/common/Button";

export class Unlock extends Component {
  constructor(props) {
    super(props);

    this.unlock = this.unlock.bind(this);
  }

  unlock() {
    MetaMask.auth();
  }

  render() {
    // destructuring props
    const { history } = this.props;

    return (
      <div className="jur--metamask--required">
        <h2>MetaMask is Required</h2>
        <hr />
        <p>
          MetaMask is an extension for accessing Ethereum enabled distributed
          applications, or "Dapps" in your normal browser!
          <br />
          The extension injects the Ethereum web3 API into every website's
          javascript context, so that dapps can read from the blockchain.
        </p>
        <Button
          onClick={() => {
            this.unlock();
          }}
          style={{ marginLeft: "10px" }}
          name="Unlock MetaMask"
        />
        <Button
          onClick={() => {
            history.location = "https://metamask.io";
          }}
          style={{ marginLeft: "10px" }}
          name="Get Chrome Extension"
        />
      </div>
    );
  }
}