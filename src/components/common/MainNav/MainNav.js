import React from "react";

import { NavLink } from "react-router-dom";
import { ContractsIcon } from "../Icons/ContractsIcon";
import { DisputesIcon } from "../Icons/DisputesIcon";

import "./MainNav.scss";
import { mapLabelsToProps } from "../../../utils/helpers";

const MainNavPure = ({ labels }) => {
  const menuList = [
    {
      id: 0,
      label: labels.contracts,
      to: "/contracts"
    },
    {
      id: 1,
      label: labels.disputes,
      to: "/disputes"
    }
  ];

  return (
    <ul className="jur-main-nav">
      {menuList.map((navItem, index) => (
        <li
          className={`jur-main-nav__item jur-main-nav__item--${(
            navItem.label || ""
          ).toLowerCase()}`}
          key={navItem.id.toString()}
        >
          <NavLink to={navItem.to} activeClassName="active">
            {navItem.to === "/contracts" ? <ContractsIcon /> : <DisputesIcon />}
            <span title={navItem.label}>{navItem.label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export const MainNav = global.connection(MainNavPure, mapLabelsToProps);
