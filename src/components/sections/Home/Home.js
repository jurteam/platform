import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Unlock from "../../auth/Unlock";
import Button from "../../common/Button";

export class Home extends Component {
  constructor(props) {
    super(props)

    this.closeTutorial = this.closeTutorial.bind(this)
  }
  componentDidMount() {
  }

  closeTutorial() {
    const { setTutorialViewed } = this.props;
    setTutorialViewed();
  }

  render() {
    const { app, wallet, drizzleStatus } = this.props;
    const { loading, tutorial } = app;
    return (
      <div className="jur">
        {loading === false && (
          <header className="jur--body">
            {drizzleStatus.initialized ? (
              !tutorial ? (
                <>
                  Tutorial
                  <Button onClick={this.closeTutorial} color="info" size="big">Got it!</Button>
                </>
              ) : (
                <Redirect to="/contracts" />
              )
            ) : (
              <Unlock />
            )}
          </header>
        )}
      </div>
    );
  }
}
