import React, { useEffect, useState } from "react";

import "./Timer.scss";
import { remaining } from "./TimerHelpers";

const Timer = ({ render, time }) => {
  const [count, setCount] = useState(0);
  const [till, setTill] = useState(remaining(time));

  useEffect(() => {
    if (["minutes", "sec"].includes(till.unit)) {
      setTill(remaining(time));
      const ticker = setTimeout(() => setCount(count + 1), 1000);
      return () => clearTimeout(ticker);
    }
  }, [count]);

  const message = render(till);
  return <span className="jur-timer">{message}</span>;
};

export default Timer;
