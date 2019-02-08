/* eslint-disable no-unused-vars */
import React from "react";
import { AccountData, ContractData, ContractForm } from "drizzle-react-components";

import style from "./Balance.scss"; // load scss properly

// export const Balance = ({ amount, symbol }) => (
//   <div className="jur--balance">
//     <p><strong>Jur Balance</strong></p>
//     <p className="amount">{symbol} {amount}</p>
//   </div>
// );

export const Balance = ({ drizzleStatus, accounts }) => (drizzleStatus.initialized) ?(
    <div className="App">
      <header className="App-header">
        <AccountData accountIndex="0" units="ether" precision="3" />
        <h1 className="App-title">Tutorial Token</h1>
        <p>
          <strong>Total Supply</strong>:{" "}
          <ContractData
            contract="TutorialToken"
            method="totalSupply"
            methodArgs={[{ from: accounts[0] }]}
          />{" "}
          <ContractData
            contract="TutorialToken"
            method="symbol"
            hideIndicator
          />
        </p>
        <p>
          <strong>My Balance</strong>:{" "}
          <ContractData
            contract="TutorialToken"
            method="balanceOf"
            methodArgs={[accounts[0]]}
          />
        </p>
        <h3>Send Tokens</h3>
      </header>
      <div className="App-intro">
        <ContractForm
          contract="TutorialToken"
          method="transfer"
          labels={["To Address", "Amount to Send"]}
        />
      </div>
    </div>
  ) : (<div>Loading dapp...</div>);
