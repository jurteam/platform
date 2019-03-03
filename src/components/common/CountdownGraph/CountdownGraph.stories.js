import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import CountdownGraph from './';

storiesOf('CountdownGraph', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Rejected', () => (
    <CountdownGraph
      days={2}
      hours={0}
      minutes={0}
      startDate="February 24, 2019 23:30:00"
      statusId={-1}
      expireAlertFrom={1000*60*60*24}
      onProgress={percentage => console.log(percentage)}
    />
  ))
  .add('Draft', () => (
    <CountdownGraph
      days={2}
      hours={0}
      minutes={0}
      startDate="February 24, 2019 23:30:00"
      statusId={0}
      expireAlertFrom={1000*60*60*24}
      onProgress={percentage => console.log(percentage)}
    />
  ))
  .add('Waiting For Counterparty', () => (
    <CountdownGraph
      days={2}
      hours={0}
      minutes={0}
      startDate="February 24, 2019 23:30:00"
      statusId={1}
      expireAlertFrom={1000*60*60*24}
      onProgress={percentage => console.log(percentage)}
    />
  ))
  .add('OnGoing', () => (
    <CountdownGraph
      days={5}
      hours={0}
      minutes={0}
      startDate="February 24, 2019 23:30:00"
      statusId={5}
      expireAlertFrom={1000*60*60*24}
      onProgress={percentage => console.log(percentage)}
    />
  ))
  .add('Expired', () => (
    <CountdownGraph
      days={5}
      hours={0}
      minutes={0}
      startDate="February 24, 2019 23:30:00"
      statusId={8}
      expireAlertFrom={1000*60*60*24}
      onProgress={percentage => console.log(percentage)}
    />
  ))
  .add('Contract Closed', () => (
    <CountdownGraph
      days={5}
      hours={0}
      minutes={0}
      startDate="February 24, 2019 23:30:00"
      statusId={9}
      expireAlertFrom={1000*60*60*24}
      onProgress={percentage => console.log(percentage)}
    />
  ))
  .add('Open Friendly resolution', () => (
    <CountdownGraph
      days={5}
      hours={0}
      minutes={0}
      startDate="February 24, 2019 23:30:00"
      statusId={21}
      expireAlertFrom={1000*60*60*24}
      onProgress={percentage => console.log(percentage)}
    />
  ))
  .add('Closed Friendly resolution', () => (
    <CountdownGraph
      days={5}
      hours={0}
      minutes={0}
      startDate="February 24, 2019 23:30:00"
      statusId={29}
      expireAlertFrom={1000*60*60*24}
      onProgress={percentage => console.log(percentage)}
    />
  ))
  .add('Open Dispute', () => (
    <CountdownGraph
      days={5}
      hours={0}
      minutes={0}
      startDate="February 24, 2019 23:30:00"
      statusId={31}
      expireAlertFrom={1000*60*60*24}
      onProgress={percentage => console.log(percentage)}
    />
  ))
  .add('OnGoing Dispute', () => (
    <CountdownGraph
      days={5}
      hours={0}
      minutes={0}
      startDate={+new Date()}
      statusId={35}
      expireAlertFrom={1000*60*60*24}
      onProgress={percentage => console.log(percentage)}
    />
  ))
  .add('Extended Dispute', () => (
    <CountdownGraph
      days={5}
      hours={0}
      minutes={0}
      startDate={+new Date()}
      statusId={36}
      expireAlertFrom={1000*60*60*24}
      onProgress={percentage => console.log(percentage)}
      onExpire={() => alert('finished')}
    />
  ))
  .add('Expired Dispute', () => (
    <CountdownGraph
      days={5}
      hours={0}
      minutes={0}
      startDate={+new Date()}
      statusId={38}
      expireAlertFrom={1000*60*60*24}
      onProgress={percentage => console.log(percentage)}
    />
  ))
  .add('Dispute Closed', () => (
    <CountdownGraph
      days={5}
      hours={0}
      minutes={0}
      startDate={+new Date()}
      statusId={39}
      expireAlertFrom={1000*60*60*24}
      onProgress={percentage => console.log(percentage)}
    />
  ))