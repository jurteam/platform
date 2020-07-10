import React from "react";
import "./RewardsAction.scss";
import { i18nDateFormatSec } from "../../../../utils/helpers";
import { canWithdraw, isMyProfile } from "JurUtils/AdvocateHelpers";
import WithdrawButton from "./WithdrawButton";
import { getWallet } from "../../../../sagas/Selectors";

const RewardsAction = ({ activity, isPublic }) =>
  !isPublic && canWithdraw(activity) ? (
    <WithdrawButton
      activityScId={activity.activityScId}
      slotScId={activity.slotScId}
    />
  ) : (
    <span>
      {activity.rewardedOn
        ? i18nDateFormatSec(activity.rewardedOn)
        : "Not Credited Yet"}
    </span>
  );

const mapStateToProps = state => {
  const { address } = getWallet(state);
  return {
    isPublic: !isMyProfile(address)
  };
};

export default global.connection(RewardsAction, mapStateToProps);
