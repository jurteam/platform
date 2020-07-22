import React from "react";

import Button from "JurCommon/Button";
import { ADVOCATE_WITHDRAW } from "../../../../reducers/types";
import { getAdvocateWithdraws } from "../../../../sagas/Selectors";
import { keyRead } from "JurUtils/AdvocateHelpers";

const WithdrawButton = ({
  rewardAmount,
  activityScId,
  slotScId,
  withdraws,
  onWithdraw
}) => {
  const inProgress = keyRead(withdraws, activityScId, slotScId);
  return (
    <Button
      className="jur-table__action-button"
      variant="contained"
      disabled={inProgress}
      onClick={() => onWithdraw(activityScId, slotScId, rewardAmount)}
    >
      {inProgress ? "Withdrawing" : "Withdraw"}
    </Button>
  );
};

const onWithdraw = (activityScId, slotScId, rewardAmount) => ({
  type: ADVOCATE_WITHDRAW,
  payload: { activityScId, slotScId, rewardAmount }
});

const mapDispatchToProps = { onWithdraw };

const mapStateToProps = state => ({
  withdraws: getAdvocateWithdraws(state)
});

export default global.connection(
  WithdrawButton,
  mapStateToProps,
  mapDispatchToProps
);
