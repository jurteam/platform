import React from "react";

import "./Main.scss";

export const Main = ({ children, className = "" }) => (
  <main className={`jur-main ${className}`}>{children}</main>
);
