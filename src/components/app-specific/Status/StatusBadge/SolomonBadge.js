import React from "react";
import "./StatusBadge.scss";
import { SolomonIcon } from "JurCommon/Icons";

const SolomonBadge = () => (
  <div className="jur-status-badge jur-status-badge__solomon">
    <SolomonIcon className="icon-24" />
    <span className="jur-status-badge__text jur-status-badge__text-solomon">
      Solomon
    </span>
  </div>
);

export default SolomonBadge;
