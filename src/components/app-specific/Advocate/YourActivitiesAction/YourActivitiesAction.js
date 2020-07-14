import React from "react";
import "./YourActivitiesAction.scss";

import MarkCompleteButton from "./MarkCompleteButton";
import { canMarkComplete } from "JurUtils/AdvocateHelpers";

const YourActivitiesAction = ({ activity }) =>
  canMarkComplete(activity) ? (
    <MarkCompleteButton
      activityScId={activity.activityScId}
      slotScId={activity.slotScId}
    />
  ) : (
    <span>{activity.state}</span>
  );

export default YourActivitiesAction;
