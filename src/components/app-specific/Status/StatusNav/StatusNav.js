import React from "react";
import "./StatusNav.scss";
import { NavLink } from "react-router-dom";
import { StatusNavIcon } from "JurCommon/Icons";

const StatusNav = () => (
  <NavLink
    to="/status/holders"
    activeClassName="jur-status-nav__active"
    className="jur-status-nav jur-nav-right"
  >
    <StatusNavIcon /> <span className="jur-status-nav__label">Jur Status</span>
  </NavLink>
);
export default StatusNav;
