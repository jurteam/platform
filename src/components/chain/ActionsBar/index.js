import React from "react"; // eslint-disable-line no-unused-vars
import { drizzleConnect } from "drizzle-react";
import { ActionsBar } from "./ActionsBar";

const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
    contract: state.contract.current,
    dispute: state.dispute.current
  };
};

export default drizzleConnect(ActionsBar, mapStateToProps);
