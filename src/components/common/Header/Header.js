/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

import src from "../../../assets/logo.svg";
import style from "./Header.scss"; // load scss properly

export const Header = ({ app: { loaded } }) => (
  <div className="jur--header">
    <Link to="/"><img src={src} alt="JUR" /></Link>
  </div>
);
