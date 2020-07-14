import React from "react";

import Button from "JurCommon/Button";
import { ADVOCATE_MARK_SLOT } from "../../../../reducers/types";
import { getAdvocateSlotMarks } from "../../../../sagas/Selectors";
import { keyRead } from "JurUtils/AdvocateHelpers";

const MarkCompleteButton = ({
  activityScId,
  slotScId,
  slotMarks,
  onWithdraw
}) => {
  const inProgress = keyRead(slotMarks, activityScId, slotScId);
  return (
    <Button
      variant="contained"
      disabled={inProgress}
      onClick={() => onWithdraw(activityScId, slotScId)}
    >
      {inProgress ? "Marking" : "Mark As Complete"}
    </Button>
  );
};

const onWithdraw = (activityScId, slotScId) => ({
  type: ADVOCATE_MARK_SLOT,
  payload: { activityScId, slotScId }
});

const mapDispatchToProps = { onWithdraw };

const mapStateToProps = state => ({
  slotMarks: getAdvocateSlotMarks(state)
});

export default global.connection(
  MarkCompleteButton,
  mapStateToProps,
  mapDispatchToProps
);
