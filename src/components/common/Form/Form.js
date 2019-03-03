import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FormInput} from './FormInput';
import {FormSelect} from './FormSelect';
import {FormLabel} from './FormLabel';
import {FormGroup} from './FormGroup';
import {FormWrapper} from './FormWrapper';

export class Form extends Component {
  static Wrapper = FormWrapper;
  static Group = FormGroup;
  static Label = FormLabel;
  static Input = FormInput;
  static Select = FormSelect;

  render() {
    return (<form {...this.props}>{this.props.children}</form>);
  }
}