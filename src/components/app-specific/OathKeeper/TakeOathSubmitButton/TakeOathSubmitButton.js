import React from "react";
import Button from "JurCommon/Button";
import { OATH_KEEPER_TAKE_OATH } from "../../../../reducers/types";

const TakeOathSubmitButton = ({ isTakingOath, onClick }) => (
  <Button color="gradient" onClick={onClick} disabled={isTakingOath}>
    {isTakingOath ? "Taking Oath..." : "Oath Now"}
  </Button>
);

const mapStateToProps = state => ({
  isTakingOath: state.oathKeeper.isTakingOath
});

const onClick = () => ({ type: OATH_KEEPER_TAKE_OATH });
const mapDispatchToProps = { onClick };

export default global.connection(
  TakeOathSubmitButton,
  mapStateToProps,
  mapDispatchToProps
);
