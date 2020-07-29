import React from "react";
import "./OathKeeperNav.scss";
import { OathKeeperNavIcon } from "JurCommon/Icons";
import { NavLink } from "react-router-dom";
import { mapLabelsToProps } from "../../../../utils/helpers";

const OathKeeperNav = ({ labels }) => (
  <NavLink
    to="/oath-keeper/oath-takers"
    activeClassName="jur-oath-keeper-nav__active"
    className="jur-oath-keeper-nav"
  >
    <OathKeeperNavIcon />{" "}
    <span className="jur-oath-keeper-nav__label">{labels.oathKeeper}</span>
  </NavLink>
);

export default global.connection(OathKeeperNav, mapLabelsToProps);
