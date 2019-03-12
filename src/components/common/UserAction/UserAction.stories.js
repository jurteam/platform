import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import UserAction from './';
import UserActionHeader from '../UserActionHeader';
import UserActionBody from '../UserActionBody';
import UserActionFooter from '../UserActionFooter';
import Button from '../Button';
import MetaMaskWrapper from '../MetaMaskWrapper';


storiesOf('UserAction', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Default', () => (
    <UserAction>
      <UserActionHeader>
        Disclaimer
      </UserActionHeader>
      <UserActionBody>
        Jur is an interface on the blockchain. Jur can also be used without our Interface. You use this interface provided by Jur AG at your own risk. You will evaluate your decisions with your legal and fiscal advisors. Privacy Policy: Jur AG doesn't store any your personal data, except your email if requested. After 7 days from the conclusion of any contract, the contract will be erased and not stored by Jur AG. Note that if you want to keep recrods, you will need to archive your contracts locally.
      </UserActionBody>
      <UserActionFooter>
        <Button size="big">Decline</Button>
      </UserActionFooter>
    </UserAction>
  ))
  .add('error', () => (
    <MetaMaskWrapper>
      <UserAction>
        <UserActionHeader variant="error">
          MetaMask is Required
        </UserActionHeader>
        <UserActionBody>
          MetaMask is an extension for accessing Ethereum enabled distributed applications, or "Dapps" in your normal browser! The extension injects the Ethereum web3 API into every website's javascript context, so that dapps can read from the blockchain.
        </UserActionBody>
        <UserActionFooter>
          <Button size="big">Get Chrome Extension</Button>
          <Button size="big">Get Chrome Extension</Button>
        </UserActionFooter>
      </UserAction>
    </MetaMaskWrapper>
  ))
  .add('Without USerActionHeader', () => (
    <UserAction>
      <UserActionBody>
        MetaMask is an extension for accessing Ethereum enabled distributed applications, or "Dapps" in your normal browser! The extension injects the Ethereum web3 API into every website's javascript context, so that dapps can read from the blockchain.
      </UserActionBody>
      <UserActionFooter>
        <Button size="big">Get Chrome Extension</Button>
      </UserActionFooter>
    </UserAction>
  ))