/* eslint-disable no-unused-vars */
import React from "react";
import { ContractData } from "drizzle-react-components";

import style from "./Balance.scss"; // load scss properly

// export const Balance = ({ amount, symbol }) => (
//   <div className="jur--balance">
//     <p><strong>Jur Balance</strong></p>
//     <p className="amount">{symbol} {amount}</p>
//   </div>
// );

export const Balance = ({ drizzleStatus, accounts }) =>
  drizzleStatus.initialized ? (
    <div className="jur--balance">
      <strong>Total Supply</strong>:{" "}
      <ContractData
        contract="JURToken"
        method="totalSupply"
        // methodArgs={[{ from: accounts[0] }]}
      />{" "}
      <ContractData
        contract="JURToken"
        method="balanceOf"
        // methodArgs={[accounts[0]]}
      />
      <ContractData contract="JURToken" method="symbol" hideIndicator />
    </div>
  ) : null;
