import React from "react";
import "./WithdrawOathButton.scss";

import Button from "JurCommon/Button";
import { OATH_KEEPER_WITHDRAW_OATH } from "../../../../reducers/types";

const WithdrawOathButton = ({ oathIndex, isWithdrawing, onWithdraw }) => (
  <Button variant="contained" onClick={() => onWithdraw(oathIndex)}>
    {isWithdrawing ? "Withdrawing" : "Withdraw"}
  </Button>
);

const onWithdraw = oathIndex => ({
  type: OATH_KEEPER_WITHDRAW_OATH,
  payload: oathIndex
});

const mapDispatchToProps = { onWithdraw };

export default global.connection(WithdrawOathButton, null, mapDispatchToProps);
