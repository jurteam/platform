import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Header from './';
import Logo from '../Logo';
import ProfilePreview from '../ProfilePreview';
import MainNav from '../MainNav';

storiesOf('Header', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Header', () => <Header />)
  .add('ProfilePreview with name', () => (
    <Header>
      <Logo />
      <MainNav />
      <ProfilePreview name="Alice" seed="0x3954939439487573664374" shouldRenderName balance="7546857" currency="Jur" />
    </Header>
  ))
  .add('ProfilePreview without name', () => (
    <Header>
      <Logo />
      <MainNav />
      <ProfilePreview name="" seed="0x3954939439487573664374" shouldRenderName balance="7546857" currency="Jur" />
    </Header>
  ))