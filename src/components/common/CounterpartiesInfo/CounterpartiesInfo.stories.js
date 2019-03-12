import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import CounterpartiesInfo from './';

const title = 'Counterparties';
const description = 'Email address is not mandatory. If you provide your email, you will get notifications during all the different stages of the contract execution and the eventual dispute resolution';

storiesOf('CounterpartiesInfo', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Default', () => <CounterpartiesInfo title={ title } description={ description } />)