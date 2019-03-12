import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import ProfileForm from './';

storiesOf('ProfileForm', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Default', () => <ProfileForm wallet={{address: '0xkfr48774n7y4t84b'}} onSubmit={ () => alert('Submit form fired') } />)