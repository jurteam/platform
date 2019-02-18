import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { AppContext } from "./../../../bootstrap/AppProvider";
import { createRoutes } from "./../../../bootstrap/Routing";

import "./Breadcrumbs.scss";

const Breadcrumbs = props => {
  // Context
  const { labels } = useContext(AppContext);

  const Routes = createRoutes(false);
  const {
    match: { path }
  } = props;

  const root = Routes.find(el => {
    return el.path === path;
  });

  useEffect(() => {
    document.title =
      labels.jur + (root && root.title ? ` - ${root.title}` : "");
  });

  return <div className="jur--breadcrumbs">{root && root.title}</div>;
};

export default Breadcrumbs;
