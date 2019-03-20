import React from "react";
import AvatarChart from "../AvatarChart";
import { toCurrencyFormat } from "../../../utils/helpers";
import Button from "../Button";

import "./VoteProgress.scss";

export const VoteProgress = ({
  counterparty,
  highlightColor,
  onVote,
  canVote,
  statusId
}) => {
  const voteOnGoing = [35, 36].indexOf(Number(statusId)) > -1;
  const closedDispute = statusId === 39;
  const votingAllowed = canVote && voteOnGoing;
  const isWinner = counterparty.winner;
  const classes = {
    "jur-vote-progress": true,
    "jur-vote-progress--green": highlightColor === "green",
    "jur-vote-progress--blue": highlightColor === "blue",
    "jur-vote-progress--lose": closedDispute && !isWinner
  };

  const classNames = Object.keys(classes)
    .filter(className => classes[className])
    .join(" ");
  return (
    <div className={classNames}>
      <AvatarChart
        seed={counterparty.wallet.address}
        percentage={counterparty.percentage}
        color={highlightColor}
      />
      <div className="jur-vote-progress__name">
        {counterparty.shouldRenderName
          ? counterparty.name
          : counterparty.wallet.address}
      </div>
      <div className="jur-vote-progress__percentage">
        {counterparty.percentage.toString().indexOf("%") > -1
          ? counterparty.percentage
          : counterparty.percentage + "%"}
      </div>
      <div className="jur-vote-progress__value">
        {toCurrencyFormat(counterparty.value)}
      </div>
      {votingAllowed ? (
        <Button
          color={highlightColor === "green" ? "success" : "info"}
          onClick={() => onVote(counterparty)}
          fullWidth
        >
          Vote
        </Button>
      ) : isWinner ? (
        <div className="jur-vote-progress__result">Wins</div>
      ) : null}
    </div>
  );
};
