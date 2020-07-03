import React from "react";
import "./StatusBadge.scss";

import JustinianBadge from "./JustinianBadge";
import SolomonBadge from "./SolomonBadge";
import AdvocateBadge from "./AdvocateBadge";

const StatusBadge = ({ statusType }) => {
  switch (statusType) {
    case "Justinian":
    case "justinian":
      return <JustinianBadge />;
    case "Solomon":
    case "solomon":
      return <SolomonBadge />;
    case "Normal":
    case "normal":
      return <AdvocateBadge />;
    default:
      return null;
  }
};

export default StatusBadge;
