import React from "react";


export const TableBody = ( props ) => {
  const { children, className } = props;
  return (<tbody className={className}>{children}</tbody>);
};
