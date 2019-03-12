import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import BlockInfo from './';

storiesOf('BlockInfo', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('With title', () => (
    <BlockInfo
      title="Attention"
      description="By voting, you are Jur tokens at risk . You will lose your Jur token if you vote on the minority side but you can earn around as many tokens as you voted if you vote for the majority early enough. This is not gambling. There is no higher reward for higher risks. In case the KPIs or the evidence are not clear or you are not confident about which proposal is the fairest, abstain from voting. You are using this interface on the blockchain under your own exclusive responsibility."
    />
  ))
  .add('Without title', () => (
    <BlockInfo
      description="By voting, you are Jur tokens at risk . You will lose your Jur token if you vote on the minority side but you can earn around as many tokens as you voted if you vote for the majority early enough. This is not gambling. There is no higher reward for higher risks. In case the KPIs or the evidence are not clear or you are not confident about which proposal is the fairest, abstain from voting. You are using this interface on the blockchain under your own exclusive responsibility."
    />
  ))