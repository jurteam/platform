import React from "react";
import PropTypes from "prop-types";

export const TableBody = props => {
  const { children, className } = props;
  return (<tbody className={className}>{children}</tbody>);
};
