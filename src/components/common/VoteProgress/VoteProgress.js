import React from 'react';
import AvatarChart from '../AvatarChart';
import {toCurrencyFormat} from '../../../utils/helpers';
import Button from '../Button';

import './VoteProgress.scss';

export const VoteProgress = ({
  counterparty,
  percentage,
  value,
  highlightColor,
  OnVote,
  canVote
}) => (
  <div className={`jur-vote-progress ${highlightColor ? 'jur-vote-progress--'+highlightColor : ''}`}>
    <AvatarChart
      seed={counterparty.wallet.address}
      percentage={percentage}
      color={highlightColor}
    />
    <div className="jur-vote-progress__name">
      {counterparty.shouldRenderName ?
        counterparty.name
        : counterparty.wallet.address
      }
    </div>
    <div className="jur-vote-progress__percentage">
      {percentage.toString().indexOf('%') > -1 ?
        percentage
        : percentage + '%'
      }
    </div>
    <div className="jur-vote-progress__value">
      {toCurrencyFormat(value)}
    </div>
    {canVote &&
      <Button
        color={highlightColor === 'green' ? 'success' : 'info'}
        onClick={() => OnVote(counterparty)}
        fullWidth
      >
        Vote
      </Button>
    }
  </div>
);

