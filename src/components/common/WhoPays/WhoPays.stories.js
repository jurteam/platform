import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import WhoPays from './';

storiesOf('WhoPays', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Default', () => (
    <WhoPays
      contract={{
        from: {
          label: 'partA',
          debtor: true,
          wallet: {
            address: '0xh845684f893689fh56347563fh3486539463',
            amount: 857000
          },
          name: 'Alice',
          shouldRenderName: true
        },
        to: {
          label: 'partB',
          debtor: false,
          wallet: {
            address: '0x38683746f893457h6fh563487fh569834596',
            amount: 100000
          },
          name: 'Bob',
          shouldRenderName: false,
        },
        penaltyFee: {
          'partA': 8654,
          'partB': 1123
        }
      }}
      handleSelectPayer={value => console.log(value)}
    />
  ))
  