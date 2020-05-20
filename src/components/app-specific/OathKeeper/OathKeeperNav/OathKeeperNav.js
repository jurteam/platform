import React from "react";
import "./OathKeeperNav.scss";
import { OathKeeperNavIcon } from "JurCommon/Icons";
import { NavLink } from "react-router-dom";

const OathKeeperNav = () => (
  <NavLink to="/profile/my-oaths" className="jur-oath-keeper-nav">
    <OathKeeperNavIcon /> Oath Keeper
  </NavLink>
);
export default OathKeeperNav;
