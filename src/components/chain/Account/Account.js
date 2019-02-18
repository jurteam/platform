/* eslint-disable no-unused-vars */
import React from "react";
import Blockies from "react-blockies";

import style from "./Account.scss"; // load scss properly

export const Account = ({ app, wallet, history }) =>
  app.loading === false ? (
    <div className="jur--account" onClick={() => history.push("/profile")}>
      {wallet.address && (
        <div>
        <Blockies
          seed={wallet.address}
          // size={8}
          // scale={6}
          // bgColor="#486aad"
          // color="#37cda9"
          // spotColor="#96f490"
        />
        <aside>
          <strong>Alice</strong>
        <code>{wallet.address}</code>
      </aside>
      </div>
      )}
    </div>
  ) : null;
