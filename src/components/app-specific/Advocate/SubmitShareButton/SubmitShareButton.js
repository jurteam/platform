import React from "react";
import "./SubmitShareButton.scss";

import Button from "JurCommon/Button";
import { ADVOCATE_SHARE } from "../../../../reducers/types";
import { getShareIsSharing, getLabels } from "../../../../sagas/Selectors";

const SubmitShareButton = ({ onClick, isDisabled, labels }) => (
  <Button onClick={onClick} disabled={isDisabled} size="big" variant="gradient">
    {labels.shareNow}
  </Button>
);

const onClick = () => ({ type: ADVOCATE_SHARE });

const mapDispatchToProps = { onClick };
const mapStateToProps = state => ({
  value: getShareIsSharing(state),
  labels: getLabels(state)
});

export default global.connection(
  SubmitShareButton,
  mapStateToProps,
  mapDispatchToProps
);
