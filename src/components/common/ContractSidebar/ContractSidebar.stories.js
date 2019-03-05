import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import ContractSidebar from './';

storiesOf('ContractSidebar', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Default', () => (
    <ContractSidebar
      contract={{
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
      cases={[
        {
          label: 'Open',
          description: 'On the open layer any token holder can vote. According to our game theory, disputes over contracts with clear Key Performance Indicators and good evidence will result in fair outcomes. There is no incentive for anyone to vote on the wrong side, since there is no extra reward for choosing the unlikely proposition. The system is not corruptible because no one can realistically have 51% of Jur tokens.',
          id: 1,
        },
        {
          label: 'Hubs',
          description: 'On the open layer any token holder can vote. According to our game theory, disputes over contracts with clear Key Performance Indicators and good evidence will result in fair outcomes. There is no incentive for anyone to vote on the wrong side, since there is no extra reward for choosing the unlikely proposition. The system is not corruptible because no one can realistically have 51% of Jur tokens.',
          id: 2,
        },
      ]}
    />
  ))