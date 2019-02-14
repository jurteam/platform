import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Header from './';
import Logo from '../Logo';
import UserPreview from '../UserPreview';

storiesOf('Header', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Header', () => <Header />)
  .add('Logo', () => <Header><Logo /></Header>)
  .add('UserPreview with name', () => (
    <Header>
      <Logo />
      <UserPreview name="Alice" seed="0x3954939439487573664374" shouldRenderName balance="7546857" currency="Jur" />
    </Header>
  ))
  .add('UserPreview without name', () => (
    <Header>
      <Logo />
      <UserPreview name="" seed="0x3954939439487573664374" shouldRenderName balance="7546857" currency="Jur" />
    </Header>
  ))
  .add('UserPreview with shouldrendername false', () => (
    <Header>
      <Logo />
      <UserPreview name="Alice" seed="0x3954939439487573664374" balance="7546857" currency="Jur" />
    </Header>
  ))
  .add('UserPreview with currency as number', () => (
    <Header>
      <Logo />
      <UserPreview name="Alice" seed="0x3954939439487573664374" balance={2423} currency="Jur" />
    </Header>
  ));