import React, { useContext } from "react";
import VoteProgress from "../VoteProgress";
import { toCurrencyFormat } from "../../../utils/helpers";

import "./DisputeVote.scss";
import { AppContext } from "../../../bootstrap/AppProvider"; // context
import Button from "../Button";

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
  let resultWaitReward = "";
  const { labels } = useContext(AppContext);

  if (statusId === 39 && payout.hasWithdrawn && 
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

  if (statusId === 39 && payout.hasWithdrawn && payout.reward > 0 && payout.hasToGetReward === 1) {
    resultWaitReward = (
      <span
        dangerouslySetInnerHTML={{
          __html: labels.rewardWait.replace("%waitTime%", payout.voteLookup)
        }}
      />
    );
  }

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

        {payout.hasWithdrawn && 
        (payout.hasToGetReward === 3 || payout.hasToGetReward === 0) && 
        statusId === 39 &&         
        (
          <div className="jur-dispute-vote__result-note">{resultNote}</div>
        )}

        {
        payout.hasToGetReward === 1  && 
        statusId === 39 &&         
        (
          <div className="jur-dispute-vote__result-note">{resultWaitReward}</div>
        )}

        {payout.hasWithdrawn === false && 
          <div className="jur-dispute-vote__result-note">
            <Button color="gradient" 
            variant="gradient" 
            onClick={onWithdraw} 
            fullWidth>
              {labels.withdraw}
            </Button>
          </div>}

        {payout.hasWithdrawn && 
          payout.hasToGetReward === 2 && 
          <div className="jur-dispute-vote__result-note">
            <Button color="gradient" 
            variant="gradient" 
            onClick={onPayout} 
            fullWidth>
              {labels.reward}
            </Button>
          </div>}

      </>}

    </div>
  );
};
