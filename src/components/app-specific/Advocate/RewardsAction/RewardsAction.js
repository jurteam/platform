import React, { useState } from "react";
import "./RewardsAction.scss";
import { i18nDateFormatSec } from "../../../../utils/helpers";
import {
  canWithdraw,
  isMyProfile,
  formatWaiting,
  withdrawTimeOf
} from "JurUtils/AdvocateHelpers";
import Timer from "JurCommon/Timer";
import WithdrawButton from "./WithdrawButton";
import { getWallet, getLabels } from "../../../../sagas/Selectors";

const RewardsAction = ({ activity, isPublic, labels }) => {
  const [display, setDisplay] = useState(computeDisplay(activity, isPublic));

  switch (display) {
    case "withdraw":
      return (
        <WithdrawButton
          activityScId={activity.activityScId}
          slotScId={activity.slotScId}
          rewardAmount={activity.rewardAmount}
        />
      );
    case "rewarded":
      return <span>{i18nDateFormatSec(activity.rewardedOn)}</span>;
    case "public-waiting":
      return labels.notCreditedYet;
    case "waiting":
      return (
        <Timer
          time={withdrawTimeOf(activity.dueDate)}
          render={formatWaiting}
          onPast={() => setDisplay(computeDisplay(activity, isPublic))}
        />
      );
  }
};

const computeDisplay = (activity, isPublic) => {
  if (!isPublic && canWithdraw(activity)) return "withdraw";
  if (activity.rewardedOn) return "rewarded";
  if (isPublic) return "public-waiting";
  return "waiting";
};

const mapStateToProps = state => {
  const { address } = getWallet(state);
  return {
    isPublic: !isMyProfile(address),
    labels: getLabels(state)
  };
};

export default global.connection(RewardsAction, mapStateToProps);
