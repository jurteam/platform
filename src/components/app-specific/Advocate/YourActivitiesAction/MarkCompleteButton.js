import React, { useState } from "react";

import Button from "JurCommon/Button";
import { ADVOCATE_MARK_SLOT } from "../../../../reducers/types";
import { getAdvocateSlotMarks, getUser } from "../../../../sagas/Selectors";
import { keyRead } from "JurUtils/AdvocateHelpers";
import { ModalDiscliamer } from "JurCommon/Disclaimer";

const MarkCompleteButton = ({
  activityScId,
  slotScId,
  slotMarks,
  onWithdraw,
  isDisclaimerAccepted
}) => {
  const [isDisclaimerOpen, openDisclaimer] = useState(false);

  const inProgress = keyRead(slotMarks, activityScId, slotScId);
  return (
    <>
      <Button
        className="jur-table__action-button"
        variant="contained"
        disabled={inProgress}
        onClick={() =>
          isDisclaimerAccepted
            ? onWithdraw(activityScId, slotScId)
            : openDisclaimer(true)
        }
      >
        {inProgress ? "Marking" : "Mark As Complete"}
      </Button>
      <ModalDiscliamer
        isOpen={isDisclaimerOpen}
        onAccept={() => openDisclaimer(false)}
        onDecline={() => openDisclaimer(false)}
      />
    </>
  );
};

const onWithdraw = (activityScId, slotScId) => ({
  type: ADVOCATE_MARK_SLOT,
  payload: { activityScId, slotScId }
});

const mapDispatchToProps = { onWithdraw };

const mapStateToProps = state => ({
  slotMarks: getAdvocateSlotMarks(state),
  isDisclaimerAccepted: getUser(state).disclaimer.optin
});

export default global.connection(
  MarkCompleteButton,
  mapStateToProps,
  mapDispatchToProps
);
