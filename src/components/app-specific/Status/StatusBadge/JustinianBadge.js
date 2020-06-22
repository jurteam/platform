import React from "react";
import "./StatusBadge.scss";
import { JustinianIcon } from "JurCommon/Icons";

const JustinianBadge = () => (
  <div className="jur-status-badge jur-status-badge__justinian">
    <JustinianIcon className="icon-24" />
    <span className="jur-status-badge__text jur-status-badge__text-justinian">
      Justinian
    </span>
  </div>
);

export default JustinianBadge;
