import React, { Component } from "react";

import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";
import { FormLabel } from "./FormLabel";
import { FormGroup } from "./FormGroup";
import { FormWrapper } from "./FormWrapper";
import { FormContainer } from "./FormContainer";
import { FormDatePicker } from "./FormDatePicker";
import { FormNumericInput } from "./FormNumericInput";
import { FormTextArea } from "./FormTextArea";
import { FormErrorMsg } from "./FormErrorMsg";
import { FormSearch } from "./FormSearch";

import "./Forms.scss";

export class Form extends Component {
  static Wrapper = FormWrapper;
  static Container = FormContainer;
  static Group = FormGroup;
  static Label = FormLabel;
  static Input = FormInput;
  static Select = FormSelect;
  static DatePicker = FormDatePicker;
  static NumericInput = FormNumericInput;
  static TextArea = FormTextArea;
  static ErrorMsg = FormErrorMsg;
  static Search = FormSearch;

  render() {
    const { className, children, ...rest } = this.props;
    return (
      <form className={`jur-form ${className || ""}`} {...rest}>
        {children}
      </form>
    );
  }
}
