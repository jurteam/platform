import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import ContractPenaltyFee from './';

storiesOf('ContractPenaltyFee', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Empty', () => (
    <ContractPenaltyFee />
  ))
  .add('Filled', () => (
    <ContractPenaltyFee
      contractInfo={{
        from: '0x45i4754f594594',
        to: '0xc847n35354f58f',
        penaltyFee: {
          partA: '1239',
          partB: '3427'
        }
      }}
    />
  ))