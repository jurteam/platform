import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FormInput} from './FormInput';
import {FormSelect} from './FormSelect';
import {FormLabel} from './FormLabel';
import {FormGroup} from './FormGroup';
import {FormWrapper} from './FormWrapper';
import {FormContainer} from './FormContainer';
import {FormDatePicker} from './FormDatePicker';

import './Forms.scss';

export class Form extends Component {
  static Wrapper = FormWrapper;
  static Container = FormContainer;
  static Group = FormGroup;
  static Label = FormLabel;
  static Input = FormInput;
  static Select = FormSelect;
  static DatePicker = FormDatePicker;

  render() {
    const {
      className,
      children,
      ...rest
    } = this.props;
    return (<form className={`jur-form ${className || ''}`} {...rest}>{children}</form>);
  }
}