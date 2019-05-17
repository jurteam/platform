import React from "react";


import "./Table.scss";

export const Table = ( props ) => {
  const { children, className } = props;
  return (<table className={`jur-table ${className || ""}`}>{children}</table>);
};
