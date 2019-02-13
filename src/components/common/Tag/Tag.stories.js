import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Tag from './Tag';

storiesOf('Tag', module)
  .add('Waiting', () => <Tag statusId={0}>Waiting for counterparty</Tag>)
  .add('draft', () => <Tag statusId={1}>Draft</Tag>)
  .add('ongoing', () => <Tag statusId={2}>Ongoing</Tag>)
  .add('open dispute', () => <Tag statusId={3}>Open Dispute</Tag>)
  .add('closed dispute', () => <Tag statusId={4}>Closed Dispute</Tag>)