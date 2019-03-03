import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../Avatar';
import Amount from '../Amount';
import BlockTitle from '../BlockTitle';

import './ContractPenaltyFee.scss';

export const ContractPenaltyFee = ({contractInfo, penaltyFeeDescription}) => {
  return (
    <div className="jur-contract-penalty-fee">
      <BlockTitle title="Penalty Fee" description={penaltyFeeDescription} />
      {contractInfo &&
        <div className="jur-contract-penalty-fee__value">
          <div>
            <Avatar seed={contractInfo.from} size="xxsmall" />
            <Amount value={contractInfo.penaltyFee.partA} />
          </div>
          <div>
            <Avatar seed={contractInfo.to} size="xxsmall" />
            <Amount value={contractInfo.penaltyFee.partB} />
          </div>
        </div>
      }
    </div>
  );
};