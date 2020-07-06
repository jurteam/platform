import React from "react";
import "./RewardsAction.scss";
import { i18nDateFormat } from "../../../../utils/helpers";
const RewardsAction = ({ activity }) => (
  <span>{i18nDateFormat(activity.attributes.rewardedOn)}</span>
);
export default RewardsAction;
