import React, { useContext } from "react";
import VoteProgress from "../VoteProgress";
import { toCurrencyFormat } from "../../../utils/helpers";

import "./DisputeVote.scss";
import { AppContext } from "../../../bootstrap/AppProvider"; // context

export const DisputeVote = ( props ) => {
  const {
    hasToWithdraw,
    title,
    counterparties,
    statusId,
    onVote,
    canVote,
    winner,
    earnings,
    onReject
  } = props;
  let resultNote = "";
  const { labels } = useContext(AppContext);

  if (statusId === 39 && earnings) {
    resultNote = (
      <span
        dangerouslySetInnerHTML={{
          __html: labels.gained.replace("%tokens%", toCurrencyFormat(earnings))
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
      {!canVote && statusId === 39 && (
        <div className="jur-dispute-vote__result-note">{resultNote}</div>
      )}
      {hasToWithdraw && 
      <div className="jur-dispute-vote__result-note">WITHDRAW</div>}
    </div>
  );
};
