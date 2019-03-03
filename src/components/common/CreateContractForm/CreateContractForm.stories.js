import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import CreateContractForm from './';
const counterparties = [
  {
    wallet: {
      address: '0xlh87re78etn9g8e9gtere9'
    },
    name: 'Alice',
    email: 'alice@domain.com'
  },
  {
    wallet: {
      address: '0xlh87re7kdhgif9g8e9gtere9'
    },
    name: 'Alice',
    email: 'alice@domain.com'
  }
]
storiesOf('CreateContractForm', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Default', () => (
    <CreateContractForm
      counterparties={counterparties}
      onNext={() => alert('onNext fired')}
    />
  ))