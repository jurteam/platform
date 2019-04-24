import React, { useContext } from "react";
import AvatarChart from "../AvatarChart";
import { toCurrencyFormat } from "../../../utils/helpers";
import Button from "../Button";

import "./VoteProgress.scss";
import { AppContext } from "../../../bootstrap/AppProvider"; // context

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

  const { labels } = useContext(AppContext);

  const classNames = Object.keys(classes)
    .filter(className => classes[className])
    .join(" ");
  return (
    <div className={classNames}>
      <AvatarChart
        seed={counterparty.wallet.toLowerCase()}
        percentage={counterparty.percentage}
        color={highlightColor}
      />
      <div className="jur-vote-progress__name">
        {counterparty.renderName
          ? counterparty.name
          : counterparty.wallet.toLowerCase()}
      </div>
      <div className="jur-vote-progress__percentage">
        {counterparty.percentage.toString().indexOf("%") > -1
          ? counterparty.percentage.toFixed(2)
          : counterparty.percentage.toFixed(2) + "%"}
      </div>
      <div className="jur-vote-progress__value">
        {toCurrencyFormat(counterparty.value)}
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
