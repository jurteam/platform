import React from "react"; // eslint-disable-line no-unused-vars

import { withRouter } from "react-router-dom";
import { Account } from "./Account";

const mapStateToProps = (state) => ({
  app: state.app,
  wallet: state.wallet
});

export default global.connection(withRouter(Account), mapStateToProps);
