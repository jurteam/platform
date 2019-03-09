import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import VoteProgress from './';

storiesOf('VoteProgress', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Green', () => (
    <VoteProgress
      counterparty={{
        wallet: {
          address: '0xie57ht6fh75f4576894'
        },
        name: 'Alice',
        shouldRenderName: true
      }}
      percentage={67.2}
      value={36133}
      highlightColor="green"
      OnVote={counterparty => alert(`Votin for ${counterparty.name}`)}
      canVote
    />
  ))
  .add('Blue', () => (
    <VoteProgress
      counterparty={{
        wallet: {
          address: '0x9h8563948567364975369h347895693'
        },
        name: 'Bob',
        shouldRenderName: false
      }}
      percentage={31.4}
      value={16903}
      highlightColor="blue"
      OnVote={counterparty => alert(`Votin for ${counterparty.name}`)}
      canVote
    />
  ))
  .add('Vote disabled', () => (
    <VoteProgress
      counterparty={{
        wallet: {
          address: '0x9h8563948567364975369h34789537645'
        },
        name: 'Bob',
        shouldRenderName: false
      }}
      percentage={31.4}
      value={16903}
      highlightColor="blue"
      OnVote={counterparty => alert(`Votin for ${counterparty.name}`)}
    />
  ))