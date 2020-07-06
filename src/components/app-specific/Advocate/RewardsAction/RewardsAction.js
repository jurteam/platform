import React from "react";
import "./RewardsAction.scss";
import { i18nDateFormat } from "../../../../utils/helpers";
import { canWithdraw } from "JurUtils/AdvocateHelpers";
import WithdrawButton from "./WithdrawButton";

const RewardsAction = ({ activity }) =>
  canWithdraw(activity) ? (
    <WithdrawButton
      activityScId={activity.activityScId}
      slotScId={activity.slotScId}
    />
  ) : (
    <span>{i18nDateFormat(activity.rewardedOn)}</span>
  );

export default RewardsAction;
