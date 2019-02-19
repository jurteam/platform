import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { ProfilePage } from '../PageExamples/ProfilePage';
import { DisputesPage } from '../PageExamples/Disputes';

storiesOf('Layouts', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add('Profile page', () => <ProfilePage />)
  .add('Disputes page', () => <DisputesPage />)
