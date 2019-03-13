import React, { useState, useEffect } from "react";

import { log } from "./helpers"; // log helper

export const useFormValidation = (data, schema) => {
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    validateForm();
    log("useFormValidation - effect", "run");
  }, [formData]);

  const isValid = () => {
    return !Object.keys(errors).length > 0;
  };

  const validateForm = () => {
    let newErrors = [];

    // for each field
    schema.map(field => {
      if (typeof field.checks !== "undefined") {
        field.checks.map(checkName => {
          log("current function", FormValidation[checkName]);
          console.log(
            "useFormValidation - field",
            field.name,
            "with value '",
            formData[field.name],
            "'",
            checkName,
            "?",
            FormValidation[checkName](formData[field.name])
          );

          if (!FormValidation[checkName](formData[field.name])) {
            if (typeof newErrors[field.name] === "undefined") {
              newErrors[field.name] = [checkName];
            } else {
              newErrors[field.name].push(checkName);
            }
          } else {
            if (typeof newErrors[field.name] !== "undefined" && typeof newErrors[field.name][checkName] !== "undefined") {
              delete newErrors[field.name][checkName];
            }
          }
        });
      }
    });

    setErrors(newErrors);
  };

  return [isValid, errors, validateForm, setFormData, formData];
};

const FormValidation = {
  required: field => (typeof field !== "undefined" && field !== "" && field !== null) ? true : false,
  isTrue: field => (typeof field !== "undefined" ? field === true : true), // always true when null in case this field is optional
  isFalse: field => (typeof field !== "undefined" ? field === false : true), // always true when null in case this field is optional
  isEmail: email => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email ? regex.test(email) : true; // always true when null in case this field is optional
  },
  isWallet: address => {
    const addrCheck = /^(0x)?[0-9a-f]{40}$/i;
    const addrFormatCheck = /^(0x)?[0-9a-fA-F]{40}$/;

    return address
      ? addrCheck.test(address) && addrFormatCheck.test(address)
        ? true
        : false
      : true; // always true when null in case this field is optional
  }
};
