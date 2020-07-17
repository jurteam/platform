import React, { useEffect } from "react";
import "./Timer.scss";
const Timer = ({ render, startTime }) => {
  return render(startTime.toLocalString());
};
export default Timer;
