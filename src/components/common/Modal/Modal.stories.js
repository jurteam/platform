import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { State, Store } from "@sambego/storybook-state";

import Modal from './';
import Button from '../Button';
import ModalTitle from '../ModalTitle';
import ModalContent from '../ModalContent';
import ModalActions from '../ModalActions';

const store = new Store({
  isOpen: false
});

storiesOf('Modal', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('default', () => (
    <div>
      {/* Trigger Modal open state */}
      <Button onClick={ () => store.set({ isOpen: true }) }>Open Modal</Button>
      <State store={ store }>
        {/* Modal start */}
        <Modal
          isOpen={ store.get('isOpen') }
          onRequestClose={ () => store.set({ isOpen: false }) }
        >
          <ModalTitle>
            this is a title
          </ModalTitle>
          <ModalContent>
            Modal Content
          </ModalContent>
          <ModalActions>
            Modal CTA
          </ModalActions>
        </Modal>
        {/* Modal end */}
      </State>
    </div>
  ))