import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Countdown from './';

storiesOf('Countdown', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Draft', () => (
    <Countdown
      duration={ 1000 * 60 * 60 * 24 }
      expireDate="August 19, 2020 23:15:30"
      status={2}
      limitTimestamp={1000 * 60 * 60 * 3} // 3 hours
      daysLabel="Days"
      hoursLabel="Hours"
      minutesLabel="Minutes"
      secondsLabel="Seconds"
      showSeconds
    />
  ))