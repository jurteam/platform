import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import ContractSetValue from './';

storiesOf('ContractSetValue', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Default', () => (
    <ContractSetValue
      data={{
        contractID: 34765,
        from: {
          label: 'partA',
          debtor: true,
          wallet: {
            address: '0xh845684f893689fh56347563fh3486539463',
            amount: 86486
          },
          name: 'Alice',
          shouldRenderName: true
        },
        to: {
          label: 'partB',
          debtor: false,
          wallet: {
            address: '0x38683746f893457h6fh563487fh569834596',
            amount: 126486
          },
          name: 'Bob',
          shouldRenderName: false
        },
        penaltyFee: null
      }}
    />
  ))