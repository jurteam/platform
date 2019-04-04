/* eslint-disable no-unused-vars */
import React, { useContext } from "react";

// Context
import { AppContext } from "../../../bootstrap/AppProvider";

import src from "../../../assets/loading.gif";
import "./Spinner.scss"; // load scss properly

const SpinnerDOM = ({ loading, className }) => {
  const isLoading = loading || false; // loading by default
  const { labels } = useContext(AppContext);

  return (
    <div className={`jur--spinner${isLoading ? "" : " off"} ${className}`}>
      <img src={src} alt={labels.loading} />
    </div>
  );
};

export default SpinnerDOM;
