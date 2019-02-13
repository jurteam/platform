import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Header from './';
import Logo from '../Logo';

storiesOf('Header', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Header', () => <Header />)
  .add('Header width logo', () => <Header><Logo /></Header>);