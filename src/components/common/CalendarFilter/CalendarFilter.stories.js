import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import CalendarFilter from './';

storiesOf('CalendarFilter', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Default', () => <CalendarFilter name="from"/>)
  .add('Date selected', () => <CalendarFilter selectedDate={new Date()} name="from"/>)