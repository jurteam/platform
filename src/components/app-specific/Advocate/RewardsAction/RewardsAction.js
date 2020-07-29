import React from "react";
import "./RewardsAction.scss";
import { i18nDateFormatSec } from "../../../../utils/helpers";
import { canWithdraw, isMyProfile } from "JurUtils/AdvocateHelpers";
import WithdrawButton from "./WithdrawButton";
import { getWallet, getLabels } from "../../../../sagas/Selectors";

const RewardsAction = ({ activity, isPublic, labels }) =>
  !isPublic && canWithdraw(activity) ? (
    <WithdrawButton
      activityScId={activity.activityScId}
      slotScId={activity.slotScId}
      rewardAmount={activity.rewardAmount}
    />
  ) : (
    <span>
      {activity.rewardedOn
        ? i18nDateFormatSec(activity.rewardedOn)
        : labels.notCreditedYet}
    </span>
  );

const mapStateToProps = state => {
  const { address } = getWallet(state);
  return {
    isPublic: !isMyProfile(address),
    labels: getLabels(state)
  };
};

export default global.connection(RewardsAction, mapStateToProps);
