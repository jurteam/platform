import React from "react";
import PropTypes from "prop-types";
import VoteProgress from "../VoteProgress";
import { toCurrencyFormat } from "../../../utils/helpers";

import "./DisputeVote.scss";

export const DisputeVote = ({
  currentUserWallet,
  title,
  counterparties,
  statusId,
  onVote,
  canVote,
  onReject,
  gainedValue,
  lossedValue
}) => {
  let resultNote = "";

  if (statusId === 39) {
    counterparties.forEach(counterparty => {
      if (counterparty.wallet.address === currentUserWallet) {
        if (counterparty.winner) {
          resultNote = (
            <>
              You gained{" "}
              <strong>
                {gainedValue ? toCurrencyFormat(gainedValue) : 0} Jur tokens
              </strong>
              , congratulations!
            </>
          );
        } else {
          resultNote = (
            <>
              You lossed{" "}
              <strong>
                {lossedValue ? toCurrencyFormat(lossedValue) : 0} Jur
              </strong>{" "}
              tokens.
            </>
          );
        }
      }
    });
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
          />
        ))}
      </div>
      {canVote && (
        <div className="jur-dispute-vote__note">
          Do you feel the contract is illegal or inapplicable?
          <span onClick={onReject}>Vote for reject</span>
        </div>
      )}
      {!canVote && statusId === 39 && (
        <div className="jur-dispute-vote__result-note">{resultNote}</div>
      )}
    </div>
  );
};
