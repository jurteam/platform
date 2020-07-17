import React from "react"; // eslint-disable-line no-unused-vars

import { Balance } from "./Balance";

const mapStateToProps = (state) => {
  return {
    wallet: state.wallet
  };
};

export default global.connection(Balance, mapStateToProps);
