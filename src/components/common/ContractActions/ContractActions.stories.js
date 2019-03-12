import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import ContractActions from './';
import Button from '../Button';

storiesOf('ContractActions', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Default', () => (
    <ContractActions>
      <Button>Save Contract</Button>
      <Button variant="gradient">Send to counterparty</Button>
    </ContractActions>
  ))
  .add('Full width', () => (
    <ContractActions>
      <Button variant="gradient" fullWidth>Payment</Button>
    </ContractActions>
  ))
  .add('Rejected', () => <ContractActions statusId={-1} />)
  .add('Waiting', () => <ContractActions statusId={31} />)