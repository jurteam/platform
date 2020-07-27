import React from "react";
import "./AdvocateNav.scss";
import { NavLink } from "react-router-dom";
import { AdvocateNavIcon } from "JurCommon/Icons";
import { mapLabelsToProps } from "../../../../utils/helpers";

const AdvocateNav = ({ labels }) => (
  <NavLink
    to="/advocates/"
    activeClassName="jur-status-nav__active"
    className="jur-status-nav jur-nav-right"
  >
    <AdvocateNavIcon />{" "}
    <span className="jur-status-nav__label">{labels.advocates}</span>
  </NavLink>
);
export default global.connection(AdvocateNav, mapLabelsToProps);
