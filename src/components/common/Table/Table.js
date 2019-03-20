import React from "react";
import PropTypes from "prop-types";

import "./Table.scss";

export const Table = ({ children, className }) => (
  <table className={`jur-table ${className || ""}`}>{children}</table>
);
