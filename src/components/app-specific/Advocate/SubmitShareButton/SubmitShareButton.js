import React from "react";
import "./SubmitShareButton.scss";

import Button from "JurCommon/Button";
import { ADVOCATE_SHARE } from "../../../../reducers/types";
import { getShareIsSharing } from "../../../../sagas/Selectors";

const SubmitShareButton = ({ onClick, isDisabled }) => (
  <Button onClick={onClick} disabled={isDisabled} size="big" variant="gradient">
    Share Now
  </Button>
);

const onClick = () => ({ type: ADVOCATE_SHARE });

const mapDispatchToProps = { onClick };
const mapStateToProps = state => ({ value: getShareIsSharing(state) });

export default global.connection(
  SubmitShareButton,
  mapStateToProps,
  mapDispatchToProps
);
