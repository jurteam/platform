import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Tag from './';

storiesOf('Tag', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Draft', () => <Tag statusId={0}>Draft</Tag>)
  .add('Waiting', () => <Tag statusId={1}>Waiting for counterparty</Tag>)
  .add('Ongoing', () => <Tag statusId={2}>Ongoing</Tag>)
  .add('Open dispute', () => <Tag statusId={3}>Open Dispute</Tag>)
  .add('Closed dispute', () => <Tag statusId={4}>Closed Dispute</Tag>)