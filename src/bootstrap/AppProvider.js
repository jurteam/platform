import React, { Component } from "react";

// Helpers
import { log } from "./../utils/helpers";

import appReference from "./../../package.json"; // config
import i18n from "./../assets/i18n/en.json"; // i18n

// Application Context
export const AppContext = React.createContext();

class AppProvider extends Component {
  state = {
    version: "0.1",
    labels: {}
  };

  componentDidMount() {
    log("AppProvider", "loaded");
    this.setState({ labels: i18n, version: appReference.version });
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
