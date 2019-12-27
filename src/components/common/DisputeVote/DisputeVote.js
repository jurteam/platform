import React, { useContext, useState, useEffect  } from "react";
import VoteProgress from "../VoteProgress";
import { toCurrencyFormat } from "../../../utils/helpers";

import "./DisputeVote.scss";
import { AppContext } from "../../../bootstrap/AppProvider"; // context

export const DisputeVote = ( props ) => {
  const {
    // currentWallet,
    title,
    counterparties,
    statusId,
    onVote,
    canVote,
    winner,
    earnings,
    onReject,
    voteReject
  } = props;
  let resultNote = "";
  const { labels } = useContext(AppContext);


  const [percentageS, setPercentageS] = useState(0);
  const [valueS, setValueS] = useState(0);
  const stepsN = 50;
  const durationMS = 1500;

  if (statusId === 39 && earnings) {
    resultNote = (
      <span
        dangerouslySetInnerHTML={{
          __html: labels.gained.replace("%tokens%", toCurrencyFormat(earnings))
        }}
      />
    );
  }


  useEffect(()=>{
    // animate percentage/value changing
    let stepsPassed = 0

    const stepPercentage = (voteReject.percentage - percentageS) / stepsN
    const stepValue = (voteReject.value - valueS) / stepsN

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

  },[voteReject])



  return (
    <div className="jur-dispute-vote">
      {title && <div className="jur-dispute-vote__title">{title}</div>}
      <div className="jur-dispute-vote__vote">
        {counterparties.map((counterparty, idx) => (
          <VoteProgress
            key={counterparty.wallet.toLowerCase() || idx.toString()}
            counterparty={counterparty}
            statusId={statusId}
            onVote={() => onVote(counterparty, idx)}
            highlightColor={idx === 0 ? "green" : "blue"}
            canVote={canVote}
            wins={
              counterparty.wallet &&
              winner &&
              counterparty.wallet.toLowerCase() === winner.toLowerCase()
                ? true
                : false
            }
            stepsN={stepsN}
            durationMS={durationMS}
          />
        ))}
      </div>
      {canVote && (
        <div className="jur-dispute-vote__note">
          {labels.voteForRejectText}
          <span onClick={onReject}>
            {labels.voteForReject}<br/>
            {percentageS.toString().indexOf("%") > -1
          ? percentageS.toFixed(2)
          : percentageS.toFixed(2) + "%"} - {toCurrencyFormat(valueS)}
          </span>
        </div>
      )}
      {!canVote && statusId === 39 && (
        <div className="jur-dispute-vote__result-note">{resultNote}</div>
      )}
    </div>
  );
};
