import React from "react";
import "./OathKeeperNav.scss";
import { OathKeeperNavIcon } from "JurCommon/Icons";
import { NavLink } from "react-router-dom";

const OathKeeperNav = () => (
  <NavLink
    to="/profile/my-oaths"
    activeClassName="jur-oath-keeper-nav__active"
    className="jur-oath-keeper-nav"
    isActive={isActive}
  >
    <OathKeeperNavIcon />{" "}
    <span className="jur-oath-keeper-nav__label">Oath Keeper</span>
  </NavLink>
);

function isActive(match, location) {
  if (location.pathname === "/oath-keeper/oath-takers") return true;
  if (match) return true;
  return false;
}

export default OathKeeperNav;
