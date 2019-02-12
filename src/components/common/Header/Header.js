/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

// Components
import Account from "../../chain/Account";
import Balance from "../../chain/Balance";

import src from "../../../assets/logo.svg";
import style from "./Header.scss"; // load scss properly

export const Header = ({ app: { loaded } }) => (
  <div className="jur--header">
    <Link to="/"><img src={src} alt="JUR" /></Link>
    <Account />
    <Balance />
  </div>
);
