import React from "react";
import "./OathKeeperNav.scss";
import { OathKeeperNavIcon } from "JurCommon/Icons";
import { NavLink } from "react-router-dom";

const OathKeeperNav = () => (
  <NavLink
    to="/profile/my-oaths"
    activeClassName="jur-oath-keeper-nav__active"
    className="jur-oath-keeper-nav"
  >
    <OathKeeperNavIcon />{" "}
    <span className="jur-oath-keeper-nav__label">Oath Keeper</span>
  </NavLink>
);
export default OathKeeperNav;
