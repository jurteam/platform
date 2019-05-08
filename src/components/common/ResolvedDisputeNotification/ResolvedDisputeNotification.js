import React, { useContext } from "react";
import { HourGlassIcon } from "../Icons/HourGlassIcon";

import "./ResolvedDisputeNotification.scss";
import { AppContext } from "../../../bootstrap/AppProvider"; // context

export const ResolvedDisputeNotification = props => {
  const { labels } = useContext(AppContext);
  return (
    <div className="jur-resolved-dispute-notification" {...props}>
      <HourGlassIcon /> <span dangerouslySetInnerHTML={{__html:labels.disputeWasResolved}} />
    </div>
  );
};
