import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import ContractCaseDispute from './';

storiesOf('ContractCaseDispute', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Default', () => (
    <ContractCaseDispute
      selectedCase={{value: 2, label: 'Open hubs' }}
    />
  ))