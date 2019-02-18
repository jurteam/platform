import React, { Component } from "react";

import appReference from "./../../package.json"; // config
import i18n from "./../assets/i18n/en.json"; // i18n

// Application Context
export const AppContext = React.createContext();

class AppProvider extends Component {
  state = {
    version: appReference.version,
    labels: i18n
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
