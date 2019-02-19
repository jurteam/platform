import React, { Component } from "react";

import appReference from "./../../package.json"; // config
import i18n from "./../assets/i18n/en.json"; // i18n

// MetaMask
import MetaMask from "../hooks/MetaMask";
import { SET_LOADING } from "../reducers/types.js";

// Application Context
export const AppContext = React.createContext();

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.auth = this.auth.bind(this);
    this.exit = this.exit.bind(this);

    this.store = props.store;

    this.state = {
      version: appReference.version,
      labels: i18n,
      metamaskLoading: true,
      onNetwork: false,
      auth: this.auth,
      exit: this.exit
    };
  }

  componentDidMount() {
    if(
    typeof window.web3 === 'object') {
    this.auth();
    } else {
      this.setState({metamaskLoading: false})
      this.store.dispatch({ type: SET_LOADING, payload: false });
    }
  }

  auth() {
    this.store.dispatch({ type: SET_LOADING, payload: true });
    this.setState({ metamaskLoading: true });
    MetaMask.auth(
      () => {
        // success
        console.log("AppProvider", "store should be updated");
        this.setState({ onNetwork: true });
      },
      () => {
        // error
        console.log("AppProvider", "network connection error!");
        this.setState({ metamaskLoading: false });
        this.store.dispatch({ type: SET_LOADING, payload: false });
      }
    );
  }

  exit() {
    this.setState({ onNetwork: false });
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
