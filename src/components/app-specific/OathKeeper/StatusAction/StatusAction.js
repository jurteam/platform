import React from "react";
import "./StatusAction.scss";

import WithdrawOathButton from "../WithdrawOathButton";
import { oathState } from "../../../../utils/helpers";

const StatusAction = ({ oath, isWithdrawing }) =>
  oathState(oath).isCompleted() ? (
    <WithdrawOathButton
      oathIndex={oath.oathIndex}
      isWithdrawing={isWithdrawing}
    />
  ) : (
    <span className="jur-oath-state">{oathState(oath).toString()}</span>
  );

export default StatusAction;
