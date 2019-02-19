import React, { Component } from "react";
import { Redirect } from "react-router-dom";

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
    const { app } = this.props;
    const { tutorial } = app;
    return (
      <div className="jur">
          <header className="jur--body">
            {!tutorial ? (
                <>
                  Tutorial
                  <Button onClick={this.closeTutorial} color="info" size="big">Got it!</Button>
                </>
              ) : (
                <Redirect to="/contracts" />
              )}
          </header>
      </div>
    );
  }
}
