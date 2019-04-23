import React from "react";
import PropTypes from "prop-types";
import "./TableHead.scss";

export const TableHead = ({ children }) => {
  const childrenArray = React.Children.toArray(children);
  const rows = childrenArray.map(row =>
    React.cloneElement(row, { parentComponent: "thead", ...row.props })
  );
  return <thead>{rows}</thead>;
};
