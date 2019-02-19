import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import '../../../assets/scss/_forms.scss';
import ProfileForm from './';

storiesOf('ProfileForm', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Default', () => <ProfileForm onSubmit={ () => alert('Submit form fired') } />)