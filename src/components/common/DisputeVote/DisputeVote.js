import React, { useContext, useState } from "react";
import VoteProgress from "../VoteProgress";
import { toCurrencyFormat, log } from "../../../utils/helpers";

import "./DisputeVote.scss";
import { AppContext } from "../../../bootstrap/AppProvider"; // context
import Button from "../Button";
import TimeAgo from "react-timeago";

export const DisputeVote = ( props ) => {
  const {
    payout,
    title,
    counterparties,
    onWithdraw,
    onPayout,
    statusId,
    onVote,
    canVote,
    winner,
    onReject
  } = props;
 
  let resultNote = "";
  // let resultWaitReward = "";
  const { labels } = useContext(AppContext);

  if (statusId === 39 && (payout.hasWithdrawn || (payout.hasWithdrawn === false && payout.sumToWithdraw === 0)) && 
    (payout.hasToGetReward === 3 || payout.hasToGetReward === 0)) {

    const earnings = payout.sumToWithdraw + payout.reward

    console.log('earnings',earnings);
    if (earnings > 0) {
      
      resultNote = (
        <span
          dangerouslySetInnerHTML={{
            __html: labels.gained.replace("%tokens%", toCurrencyFormat(earnings))
          }}
        />
      );
    }   
  }

  const rewardButton = (<Button color="gradient" 
  variant="gradient" 
  onClick={onPayout}
  fullWidth>
    {labels.reward}
  </Button>)

  const [isPassed, setPassed] = useState(false);


  const isPassedTime = date => {
    const d = new Date();
    const n = d.getTime();
     
    log('isPassedTime',date < n)
    setPassed(date < n)
    // if (date < n) {
    //   log('isPassedTime - date')
    //   return date;
    // } else {
    //   log('isPassedTime - n')
      return n;
    // }

  };


  // if (statusId === 39 && (payout.hasWithdrawn || (payout.hasWithdrawn === false && payout.sumToWithdraw === 0)) && payout.reward > 0 && payout.hasToGetReward === 1) {
  //   resultWaitReward = (
  //     <span
  //       dangerouslySetInnerHTML={{
  //         __html: labels.rewardWait.replace("%waitTime%", payout.voteLookup)
  //       }}
  //     />
  //   );
  // }

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
          />
        ))}         
      </div>
      {canVote && (
        <div className="jur-dispute-vote__note">
          {labels.voteForRejectText}
          <span onClick={onReject}>{labels.voteForReject}</span>
        </div>
      )}


      {payout && 
      <>

        {(payout.hasWithdrawn || (payout.hasWithdrawn === false && payout.sumToWithdraw === 0)) && 
        (payout.hasToGetReward === 3 || payout.hasToGetReward === 0) && 
        statusId === 39 &&         
        (
          <div className="jur-dispute-vote__result-note">{resultNote}</div>
        )}

        {payout.hasToGetReward === 1 &&
        (payout.hasWithdrawn || (payout.hasWithdrawn === false && payout.sumToWithdraw === 0)) &&
        statusId === 39 &&
        <div className="jur-dispute-vote__result-note">
          
          <div style={{display:(!isPassed?`block`:`none`)}}>
            {labels.rewardWait1}
            <TimeAgo date={(payout.voteLookup*1000)} now={() => isPassedTime(payout.voteLookup*1000)} />
            {labels.rewardWait2}
          </div>
          
          {isPassed && rewardButton}
        </div>}

        {(payout.hasWithdrawn === false && payout.sumToWithdraw > 0) &&
          <div className="jur-dispute-vote__result-note">
            <Button color="gradient" 
            variant="gradient" 
            onClick={onWithdraw} 
            fullWidth>
              {labels.withdraw}
            </Button>
          </div>}

        {(payout.hasWithdrawn || (payout.hasWithdrawn === false && payout.sumToWithdraw === 0)) && 
          payout.hasToGetReward === 2 && 
          <div className="jur-dispute-vote__result-note">
            {rewardButton}
          </div>}

      </>}

    </div>
  );
};
