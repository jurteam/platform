import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Account } from "./Account";

const mapStateToProps = state => ({
  app: state.app,
  wallet: state.wallet
});

export default connect(mapStateToProps)(withRouter(Account));
