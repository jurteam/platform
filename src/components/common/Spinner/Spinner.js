/* eslint-disable no-unused-vars */
import React from "react";

import src from "../../../assets/loading.gif";
import style from "./Spinner.scss"; // load scss properly

export const Spinner = ({ app: { loaded } }) => (
  <div className={`jur--spinner${loaded ? " off" : ""}`}>
    <img src={src} alt="Loading..." />
  </div>
);
