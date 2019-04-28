import React from "react";
import { Form } from "./Form";

export const FormInput = props => {
  const { className, error, errorMsg, ...rest } = props;
  return (
    <>
      <input className={`${className} ${error ? "error" : ""}`} {...rest} />
      {error && errorMsg && <Form.ErrorMsg msg={errorMsg} />}
    </>
  );
};