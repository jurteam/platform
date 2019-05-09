import React, { Component } from "react";

import appReference from "../../package.json"; // config
import i18n from "../assets/i18n/en/labels.json"; // i18n

// MetaMask
import MetaMask from "../hooks/MetaMask";
import { SET_LOADING, APP_EXIT } from "../reducers/types.js";

// Application Context
export const AppContext = React.createContext();

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.auth = this.auth.bind(this);
    this.exit = this.exit.bind(this);
    global.exit = this.exit; // available everywhere for sync purposes

    this.store = props.store;

    this.state = {
      version: appReference.version,
      labels: i18n,
      closedCodes: [-1, 9, 29, 39],
      archivableCodes: [-1, 0, 9, 29, 39],
      metamaskLoading: true,
      notificationsTableHeaders: [
        {label: "", className: "jur-col--options", key: "status"},
        {label: i18n.date, sortable: true, className: "jur-col--duration", key: "date"},
        {label: i18n.message, key: "activity"},
        {label: "", className: "jur-col--options", key: "opt"}
      ],
      contractTableHeaders: [
        { label: i18n.status, sortable: false, className: "jur-col--status" },
        { label: i18n.contractName, sortable: true },
        { label: i18n.duration, sortable: false, className: "jur-col--duration" },
        { label: i18n.couterpartyDetails, sortable: false, className: "jur-col--wallet" },
        { label: i18n.contractValue, sortable: true, className: "jur-col--amount" },
        { label: "", sortable: false, className: "jur-col--options" } // options
      ],
      disputeTableHeaders: [
        { label: i18n.status, sortable: false, className: "jur-col--status" },
        { label: i18n.disputeName, sortable: true },
        { label: i18n.duration, sortable: false, className: "jur-col--duration-with-seconds" },
        { label: i18n.category, sortable: true, className: "jur-col--category" },
        { label: i18n.contractValue, sortable: true, className: "jur-col--amount" },
        { label: i18n.earnings, sortable: true, className: "jur-col--amount" },
        { label: "", sortable: false, className: "jur-col--options" } // options
      ],
      oraclesTableHeaders: [
        { label: i18n.ethAddress, sortable: false },
        { label: i18n.vote, sortable: false },
        { label: i18n.msg, sortable: false },
        { label: i18n.amount, sortable: false },
        { label: i18n.time, sortable: false }
      ],
      oraclesFullTableHeaders: [
        { label: i18n.ethAddress, sortable: false },
        { label: i18n.vote, sortable: false },
        { label: i18n.msg, sortable: false },
        { label: i18n.evidences, sortable: false },
        { label: i18n.amount, sortable: false },
        { label: i18n.time, sortable: false }
      ],
      onNetwork: false,
      auth: this.auth,
      exit: this.exit
    };
  }

  componentDidMount() {
    if (typeof window.web3 === "object") {
      this.auth();
    } else {
      this.setState({ metamaskLoading: false });
      this.store.dispatch({ type: SET_LOADING, payload: false });
    }
  }

  componentWillUnmount() {
    MetaMask.cancel()
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
    const exitState = { onNetwork: false, metamaskLoading: false };
    this.store.dispatch({ type: APP_EXIT, exitState });
    this.setState(exitState);
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
