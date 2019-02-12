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
              "Home Section"
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
