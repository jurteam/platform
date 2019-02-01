/* eslint-disable no-unused-vars */
import React, { PureComponent } from "react";
import { connect } from "react-redux";

// Actions
import { fetchAccounts } from "../actions/Wallet";

class Initializer extends PureComponent {
  componentDidMount() {
    const { fetchAccounts } = this.props;
    fetchAccounts(); // Fetch accounts from EVM Network
  }
  render() {
    const { children } = this.props;
    return children;
  }
}

const mapStateToProps = state => ({
  wallet: state.wallet
});

const mapDispatchToProps = { fetchAccounts };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Initializer);
