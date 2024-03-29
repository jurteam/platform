import React, { useContext, useState, useEffect } from "react";
import AvatarChart from "../AvatarChart";
import { toCurrencyFormat, log } from "../../../utils/helpers";
import Button from "../Button";

import "./VoteProgress.scss";
import { AppContext } from "../../../bootstrap/AppProvider"; // context

export const VoteProgress = ( props ) => {
  const {
    counterparty,
    highlightColor,
    onVote,
    canVote,
    statusId,
    wins,
    stepsN,
    durationMS,
  } = props;

  const [percentageS, setPercentageS] = useState(0);
  const [valueS, setValueS] = useState(0);

  const voteOnGoing = [35, 36].indexOf(Number(statusId)) > -1;
  const closedDispute = statusId === 39;
  const votingAllowed = canVote && voteOnGoing;
  const isWinner = counterparty.winner || wins;
  const classes = {
    "jur-vote-progress": true,
    "jur-vote-progress--green": highlightColor === "green",
    "jur-vote-progress--blue": highlightColor === "blue",
    "jur-vote-progress--lose": closedDispute && !isWinner
  };

  const { labels } = useContext(AppContext);

  const classNames = Object.keys(classes)
    .filter((className) => classes[className])
    .join(" ");

  useEffect(()=>{
    // animate percentage/value changing
    let stepsPassed = 0

    const stepPercentage = (counterparty.percentage - percentageS) / stepsN
    const stepValue = (counterparty.value - valueS) / stepsN

    let newPercentage = percentageS;
    let newValue = valueS;
    
    let interv = setInterval(() => {
      

      if (stepsPassed<stepsN) {
        
        newPercentage = newPercentage + stepPercentage;
        newValue = newValue + stepValue;

        setPercentageS(newPercentage);
        setValueS(newValue);
        
      } else {
        clearInterval(interv)
      }
      stepsPassed++;
      
    }, (durationMS/stepsN));

  },[counterparty.percentage])

  return (
    <div className={classNames}>
      <AvatarChart
        seed={counterparty.wallet.toLowerCase()}
        percentage={percentageS}
        color={highlightColor}
      />
      <div className="jur-vote-progress__name">
        {(counterparty.renderName && counterparty.name)
          ? counterparty.name
          : counterparty.wallet.toLowerCase()}
      </div>
      <div className="jur-vote-progress__percentage">
        {percentageS.toString().indexOf("%") > -1
          ? percentageS.toFixed(2)
          : percentageS.toFixed(2) + "%"}
      </div>
      <div className="jur-vote-progress__value">
        {toCurrencyFormat(valueS)}
      </div>
      {votingAllowed ? (
        <Button
          color={highlightColor === "green" ? "success" : "info"}
          onClick={() => onVote(counterparty)}
          fullWidth
          hoverColor={highlightColor === "green" ? "success" : "info"}
        >
          {labels.vote}
        </Button>
      ) : isWinner ? (
        <div className="jur-vote-progress__result">{labels.wins}</div>
      ) : null}
    </div>
  );
};
