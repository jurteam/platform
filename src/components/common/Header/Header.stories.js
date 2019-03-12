import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Header from './';
import Logo from '../Logo';
import NavigationWrapper from '../NavigationWrapper';

storiesOf('Header', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add('Header', () => <Header />)
  .add('User logged', () => {
    const userIdLogged = true;
    return (
      <Header>
        <Logo />
        {userIdLogged ?
          <NavigationWrapper to="/profile" name="Alice" seed="0x3954939439487573664374" shouldRenderName balance="7546857" currency="Jur" />
          : null
        }
      </Header>
    )
  })
  .add('User not logged', () => {
    const userIdLogged = false;
    return (
      <Header>
        <Logo />
        {userIdLogged ?
          <NavigationWrapper seed="0x3954939439487573664374" shouldRenderName balance="7546857" currency="Jur" />
          : null
        }
      </Header>
    )
  })

