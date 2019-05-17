import React from "react";
import PropTypes from "prop-types";

import "./Breadcrumb.scss";

export const Breadcrumb = ( props ) => (
  <ul className={`jur-breadcrumb ${props.className || ""}`}>
    {props.crumbList.map((crumb, index) => (
      <li
        className={`jur-breadcrumb__item ${
          crumb.active ? "jur-breadcrumb__item--active" : ""
        }`}
        key={crumb.id ? crumb.id.toString() : `bread-${index}`}
      >
        <a href={crumb.to}>{crumb.label}</a>
      </li>
    ))}
  </ul>
);

Breadcrumb.propTypes = {
  crumbList: PropTypes.array.isRequired,
  className: PropTypes.string
};

Breadcrumb.defaultProps = {
  crumbList: []
};
