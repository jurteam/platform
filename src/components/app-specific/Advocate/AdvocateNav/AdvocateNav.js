import React from "react";
import "./AdvocateNav.scss";
import { NavLink } from "react-router-dom";
import { AdvocateNavIcon } from "JurCommon/Icons";

const AdvocateNav = () => (
  <NavLink
    to="/advocates/"
    activeClassName="jur-status-nav__active"
    className="jur-status-nav jur-nav-right"
  >
    <AdvocateNavIcon /> <span className="jur-status-nav__label">Advocates</span>
  </NavLink>
);
export default AdvocateNav;
