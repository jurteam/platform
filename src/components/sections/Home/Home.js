import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Unlock from "../../auth/Unlock";
import Spinner from "../../common/Spinner";

export class Home extends Component {
  componentDidMount() {
    const { setTutorialViewed } = this.props;
    setTutorialViewed();
  }
  render() {
    const { app, wallet } = this.props;
    const { isConnected } = wallet;
    const { loaded, tutorial } = app;
    return (
      <div className="jur">
        {loaded && (
          <header className="jur--body">
            {isConnected ? (
              !tutorial ? (
                "Tutorial"
              ) : (
                <Redirect to="/contracts" />
              )
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
