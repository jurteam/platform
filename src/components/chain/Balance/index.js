import React from "react";  // eslint-disable-line no-unused-vars
import { drizzleConnect } from "drizzle-react";
import { Balance } from "./Balance";

const mapStateToProps = state => {

  return {
    wallet: state.wallet
  };
};

export default drizzleConnect(Balance, mapStateToProps);
