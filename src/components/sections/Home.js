import React, { Component } from "react";
import { connect } from "react-redux";
import Blockies from "react-blockies";

class Home extends Component {
  render() {
    const { wallet } = this.props;
    return (
      <div className="jur">
        <header className="jur--header">
          {wallet.isConnected ? (
            <div>
              <p>
                Your current account is{" "}
                {wallet.address && (
                  <Blockies
                    seed={wallet.address}
                    size={8}
                    scale={6}
                    bgColor="#486aad"
                    color="#37cda9"
                    spotColor="#96f490"
                  />
                )}{" "}
                <code>{wallet.address}</code>
              </p>
            </div>
          ) : (
            <p>
              Please unlock
              <a href="https://metamask.io/" style={{ marginLeft: "10px" }}>
                MetaMask
              </a>
            </p>
          )}
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  wallet: state.wallet
});

export default connect(mapStateToProps)(Home);
