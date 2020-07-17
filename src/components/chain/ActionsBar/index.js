import React from "react"; // eslint-disable-line no-unused-vars

import { ActionsBar } from "./ActionsBar";

const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
    contract: state.contract.current,
    dispute: state.dispute.current
  };
};

export default global.connection(ActionsBar, mapStateToProps);
