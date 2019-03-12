import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import ContractAmount from './';

storiesOf('ContractAmount', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Empty', () => (
    <ContractAmount />
  ))
  .add('filled', () => (
    <ContractAmount
      debtorWalletAddress="0xkfof47847yn84nyi4ffni84"
      amount={13298}
    />
  ))