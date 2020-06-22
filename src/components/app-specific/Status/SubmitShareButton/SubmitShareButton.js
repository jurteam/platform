import React from "react";
import "./SubmitShareButton.scss";

import Button from "JurCommon/Button";
import { STATUS_SHARE } from "../../../../reducers/types";
import { getShareIsSharing } from "../../../../sagas/Selectors";

const SubmitShareButton = ({ onClick, isDisabled }) => (
  <Button onClick={onClick} disabled={isDisabled} variant="gradient">
    Share Stauts
  </Button>
);

const onClick = () => ({ type: STATUS_SHARE });

const mapDispatchToProps = { onClick };
const mapStateToProps = state => ({ value: getShareIsSharing(state) });

export default global.connection(
  SubmitShareButton,
  mapStateToProps,
  mapDispatchToProps
);
