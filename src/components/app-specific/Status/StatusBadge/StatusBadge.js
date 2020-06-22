import React from "react";
import "./StatusBadge.scss";

import JustinianBadge from "./JustinianBadge";
import SolomonBadge from "./SolomonBadge";

const StatusBadge = ({ statusType }) => {
  switch (statusType) {
    case "Justinian":
    case "justinian":
      return <JustinianBadge />;
    case "Solomon":
    case "solomon":
      return <SolomonBadge />;
    default:
      return null;
  }
};

export default StatusBadge;
