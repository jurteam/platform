import React from "react";
import { Link } from "react-router-dom";

import "./Side.scss"; // style

export default function Side(props) {
  const {
    items,
    location: { pathname }
  } = props;

  const renderNavigationItems = () => {
    if (items) {
      return (
        <ul>
          {" "}
          {items.map((item, key) => (
            <li className={pathname === item.path ? "current" : null} key={key}>
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}{" "}
        </ul>
      );
    }

    return null;
  };

  return <aside className="jur--side">{renderNavigationItems()}</aside>;
}
