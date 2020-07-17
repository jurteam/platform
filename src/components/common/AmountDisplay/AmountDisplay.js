import React from "react";
import "./AmountDisplay.scss";
import Amount from "../Amount";

const AmountDisplay = ({ balance }) =>
  typeof balance === "string" ? (
    <span className="jur-amount">--</span>
  ) : (
    <Amount value={balance} />
  );

export default AmountDisplay;
