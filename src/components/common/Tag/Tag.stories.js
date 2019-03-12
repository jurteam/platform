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
  .add('Rejected', () => <Tag statusId={-1}>Rejected</Tag>)
  .add('Draft', () => <Tag statusId={0}>Draft</Tag>)
  .add('Waiting for counterparty', () => <Tag statusId={1}>Waiting for counterparty</Tag>)
  .add('Ongoing', () => <Tag statusId={5}>Ongoing</Tag>)
  .add('Expired', () => <Tag statusId={8}>Expired</Tag>)
  .add('Completed', () => <Tag statusId={9}>Completed</Tag>)
  .add('Open Friendly Resolution', () => <Tag statusId={21}>Open Friendly Resolution</Tag>)
  .add('Closed Friendly Resolution', () => <Tag statusId={29}>Closed Friendly Resolution</Tag>)
  .add('Open Dispute', () => <Tag statusId={31}>Open Dispute</Tag>)
  .add('Ongoing Dispute', () => <Tag statusId={35}>Ongoing Dispute</Tag>)
  .add('Expired Dispute', () => <Tag statusId={38}>Expired Dispute</Tag>)
  .add('Closed Dispute', () => <Tag statusId={39}>Closed Dispute</Tag>)
