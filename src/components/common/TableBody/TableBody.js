import React from "react";
import PropTypes from "prop-types";

export const TableBody = ({ children, className }) => (
  <tbody className={className}>{children}</tbody>
);
