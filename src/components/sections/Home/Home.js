import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Page from "../../common/Page";
import Header from "../../common/Header";
import Content from "../../common/Content";
import Button from "../../common/Button";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.closeTutorial = this.closeTutorial.bind(this);
  }
  componentDidMount() {}

  closeTutorial() {
    const { setTutorialViewed } = this.props;
    setTutorialViewed();
  }

  render() {
    const { app } = this.props;
    const { tutorial } = app;
    return (
      <Page>
        <Header />
        <Content>
          {!tutorial ? (
            <>
              Tutorial
              <Button onClick={this.closeTutorial} color="info" size="big">
                Got it!
              </Button>
            </>
          ) : (
            <Redirect to="/contracts" />
          )}
        </Content>
      </Page>
    );
  }
}
