import React from "react";
import PropTypes from "prop-types";

import "./Aside.scss";

export const Aside = ( props ) => (
  <aside className="jur-aside">{props.children}</aside>
);
