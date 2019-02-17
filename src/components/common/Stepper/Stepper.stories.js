import React, { Fragment } from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { State, Store } from "@sambego/storybook-state";

import Stepper from './';
import Step from '../Step';
import Button from '../Button';
import ModalHeader from '../ModalHeader';
import ModalBody from '../ModalBody';
import ModalFooter from '../ModalFooter';

const defaultStore = new Store({
  steps: [
    {
      id: '1',
      label: 'step 1'
    },
    {
      id: '2',
      label: 'step 2'
    },
    {
      id: '3',
      label: 'step 3'
    }
  ],
  activeStep: 0
});

const handleBack = () => {
  const currentActiveStep = defaultStore.get('activeStep');
  if (currentActiveStep - 1 < 0) return;
  defaultStore.set()
  defaultStore.set({ activeStep: defaultStore.get('activeStep') - 1 });
}

const handleNext = () => {
  if (defaultStore.get('activeStep') + 1 >= defaultStore.get('steps').length) {
    alert('Finish event fired');
  } else {
    defaultStore.set({ activeStep: defaultStore.get('activeStep') + 1 });
  }
}

storiesOf('Stepper', module)
  .add('Default', () => (
    <State defaultStore={ defaultStore }>
      { state => (
        <Fragment>
          <Stepper activeStep={ defaultStore.get('activeStep') }>
            {defaultStore.get('steps').map((step, index) => (
              <Step key={ step.id.toString() }>{ step.label }</Step>
            ))}
          </Stepper>
          { defaultStore.get('activeStep') !== 0 &&
            defaultStore.get('activeStep') + 1 !== defaultStore.get('activeStep').length &&
            <Button onClick={ handleBack }>Previous</Button>
          }
          <Button onClick={ handleNext }>
            { defaultStore.get('activeStep') + 1 === defaultStore.get('steps').length ?
              'Finish'
              : 'Next'
            }
          </Button>
        </Fragment>
      )}
    </State>
  ))
  .add('Welcome Presentation', () => (
    <State store={ store }>
      { state => (
        <Fragment>
        </Fragment>
      )}
    </State>
  ))