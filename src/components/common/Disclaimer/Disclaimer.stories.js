import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Disclaimer from './';

storiesOf('Disclaimer', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Waiting', () => <Disclaimer
    isOpen={ false }
    title="Disclaimer"
    description="Jur is an interface on the blockchain. Jur can also be used without our Interface. You use this interface provided by Jur AG at your own risk. You will evaluate your decisions with your legal and fiscal advisors. Privacy Policy: Jur AG doesn't store any your personal data, except your email if requested. After 7 days from the conclusion of any contract, the contract will be erased and not stored by Jur AG. Note that if you want to keep recrods, you will need to archive your contracts locally."
    accepted={ false }
    declineLabel="Decline"
    acceptLabel="Accept"
    closeLabel="Close"
    onAccept={ () => alert('accepted') }
    onClose={ () => alert('close') }
    onDecline={ () => alert('decline') }
  />
  )