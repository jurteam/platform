import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Amount from './';

storiesOf('Amount', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('value is string', () => <Amount value="8346583" currency="JUR"/>)
  .add('value is number', () => <Amount value={38457368} currency="JUR" />)
  .add('lowercase currency', () => <Amount value={38457368} currency="jur" />)
  .add('no currency', () => <Amount value={38457368} />)