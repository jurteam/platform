import React, { Component } from "react";
import { connect } from "react-redux";
import Blockies from "react-blockies";

import Unlock from "../auth/Unlock";
import Spinner from "../common/Spinner";

class Home extends Component {
  render() {
    const { app, wallet } = this.props;
    return (
      <div className="jur">
        {app.loaded && (
          <header className="jur--body">
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
              <Unlock />
            )}
          </header>
        )}
        <Spinner />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { app, wallet } = state;
  return { app, wallet };
};

export default connect(mapStateToProps)(Home);
