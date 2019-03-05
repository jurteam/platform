import React from 'react';
import PropTypes from 'prop-types';
import BlockTitle from '../BlockTitle';
import AvatarInfo from '../AvatarInfo';

import './ContractCounterparties.scss';

export const ContractCounterparties = ({counterparties, CounterpartiesDescription}) => (
  <div className="jur-contract-counterparties">
    <BlockTitle title="Counterparties" description={CounterpartiesDescription} />
    <div className="jur-contract-counterparties__value">
      {
        counterparties.map(counterparty => (
          <AvatarInfo
            key={counterparty.wallet.address.toString()}
            userName={counterparty.name}
            userWallet={counterparty.wallet.address}
            shouldRenderName={counterparty.shouldRenderName}
            variant={counterparty.shouldRenderName ? counterparty.name ? null : 'ellipsis' : 'ellipsis'}
          />
        ))
      }
      <AvatarInfo
      />
    </div>
  </div>
)
