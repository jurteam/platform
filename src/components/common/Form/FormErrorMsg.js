import React from "react";
import { AlertIcon } from "../Icons/AlertIcon";

export const FormErrorMsg = ( props ) => {
  const { msg } = props;
  return (
    <span className="jur-form__error-msg">
      <AlertIcon /> {msg}
    </span>
  );
};
