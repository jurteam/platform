import React from "react";
import "./YourActivitiesAction.scss";

import MarkCompleteButton from "./MarkCompleteButton";
import Timer from "JurCommon/Timer";
import {
  canMarkComplete,
  isCompleted,
  formatWaiting,
  withdrawTimeOf
} from "JurUtils/AdvocateHelpers";

const YourActivitiesAction = ({ activity }) => {
  if (canMarkComplete(activity))
    return (
      <MarkCompleteButton
        activityScId={activity.activityScId}
        slotScId={activity.slotScId}
      />
    );

  if (isCompleted(activity))
    return (
      <Timer time={withdrawTimeOf(activity.dueDate)} render={formatWaiting} />
    );

  return <span>{activity.state}</span>;
};

export default YourActivitiesAction;
