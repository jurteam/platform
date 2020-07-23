import React, { useState } from "react";

import Button from "JurCommon/Button";
import { ADVOCATE_WITHDRAW } from "../../../../reducers/types";
import { getAdvocateWithdraws, getUser } from "../../../../sagas/Selectors";
import { keyRead } from "JurUtils/AdvocateHelpers";
import { ModalDiscliamer } from "JurCommon/Disclaimer";

const WithdrawButton = ({
  rewardAmount,
  activityScId,
  slotScId,
  withdraws,
  onWithdraw,
  isDisclaimerAccepted
}) => {
  const [isDisclaimerOpen, openDisclaimer] = useState(false);

  const inProgress = keyRead(withdraws, activityScId, slotScId);
  return (
    <>
      <Button
        className="jur-table__action-button"
        variant="contained"
        disabled={inProgress}
        onClick={() =>
          isDisclaimerAccepted
            ? onWithdraw(activityScId, slotScId, rewardAmount)
            : openDisclaimer(true)
        }
      >
        {inProgress ? "Withdrawing" : "Withdraw"}
      </Button>
      <ModalDiscliamer
        isOpen={isDisclaimerOpen}
        onAccept={() => openDisclaimer(false)}
        onDecline={() => openDisclaimer(false)}
      />
    </>
  );
};

const onWithdraw = (activityScId, slotScId, rewardAmount) => ({
  type: ADVOCATE_WITHDRAW,
  payload: { activityScId, slotScId, rewardAmount }
});

const mapDispatchToProps = { onWithdraw };

const mapStateToProps = state => ({
  withdraws: getAdvocateWithdraws(state),
  isDisclaimerAccepted: getUser(state).disclaimer.optin
});

export default global.connection(
  WithdrawButton,
  mapStateToProps,
  mapDispatchToProps
);
