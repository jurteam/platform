import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import {AlertIcon} from './AlertIcon';
import {BinIcon} from './BinIcon';
import {CaretDownIcon} from './CaretDownIcon';
import {CaretUpIcon} from './CaretUpIcon';
import {CheckCircleIcon} from './CheckCircleIcon';
import {ContractsIcon} from './ContractsIcon';
import {DisputesIcon} from './DisputesIcon';
import {EllipsisVIcon} from './EllipsisVIcon';
import {EyeIcon} from './EyeIcon';
import {InfoIcon} from './InfoIcon';

storiesOf('Icons', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Default', () => (
    <>
      <AlertIcon />
      <br />
      <BinIcon />
      <br />
      <CaretDownIcon />
      <br />
      <CaretUpIcon />
      <br />
      <CheckCircleIcon />
      <br />
      <ContractsIcon />
      <br />
      <DisputesIcon />
      <br />
      <EllipsisVIcon />
      <br />
      <EyeIcon />
      <br />
      <InfoIcon />
      <br />
    </>
  ))