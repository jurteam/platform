import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Tag from './index';

storiesOf('Tag', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Waiting', () => <Tag statusId={0}>Waiting for counterparty</Tag>)
  .add('draft', () => <Tag statusId={1}>Draft</Tag>)
  .add('ongoing', () => <Tag statusId={2}>Ongoing</Tag>)
  .add('open dispute', () => <Tag statusId={3}>Open Dispute</Tag>)
  .add('closed dispute', () => <Tag statusId={4}>Closed Dispute</Tag>)