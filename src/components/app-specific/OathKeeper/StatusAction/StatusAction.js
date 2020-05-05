import React from "react";
import "./StatusAction.scss";

import WithdrawOathButton from "../WithdrawOathButton";
import { oathState } from "../../../../utils/helpers";

const isCompleted = oath => oathState(oath) === oathState.COMPLETED;

const StatusAction = ({ oath, isWithdrawing }) =>
  isCompleted(oath) ? (
    <WithdrawOathButton
      oathIndex={oath.oathIndex}
      isWithdrawing={isWithdrawing}
    />
  ) : (
    <span className="jur-oath-state">{oathState(oath)}</span>
  );

export default StatusAction;
