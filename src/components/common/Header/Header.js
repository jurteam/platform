/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

// Components
import Account from "../../chain/Account";
import Balance from "../../chain/Balance";
import { Navbar } from "./Navbar";

import src from "../../../assets/logo.svg";
import style from "./Header.scss"; // load scss properly

export const Header = () => (
  <div className="jur--header">
    <Link to="/" className="jur--logo"><img src={src} alt="JUR" /></Link>
    <Navbar />
    <aside className="user">
      <Account />
      <Balance />
    </aside>
  </div>
);
