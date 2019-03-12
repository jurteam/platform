import React, { useState, useEffect } from "react";

import { log } from "./helpers"; // log helper

export const useFormValidation = (data, schema) => {
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    validateForm();
    log("useFormValidation - effect", "run");
  }, [data]);

  const isValid = () => {
    return !Object.keys(errors).length > 0;
  };

  const validateForm = () => {
    let newErrors = [];

    // for each field
    schema.map(field => {
      if (typeof field.checks !== "undefined") {
        field.checks.map(checkName => {
          log(
            "useFormValidation - FormValidation[checkName]",
            FormValidation[checkName]
          );
          log("useFormValidation - formData[field.name]", formData[field.name]);
          log(
            "useFormValidation - check value",
            FormValidation[checkName](formData[field.name])
          );

          if (!FormValidation[checkName](formData[field.name])) {
            if (typeof newErrors[field.name] === "undefined") {
              newErrors[field.name] = [checkName];
            } else {
              newErrors[field.name].push(checkName);
            }
          } else {
            if (typeof newErrors[field.name] !== "undefined") {
              delete newErrors[field.name];
            }
          }

          setErrors(newErrors);
        });
      }
    });
  };

  return [isValid, errors, validateForm, setFormData, formData];
};

const FormValidation = {
  required: (field = null) => typeof field !== "undefined" && field,
  isTrue: (field = null) =>
    typeof field !== "undefined" ? field === true : true, // always true when null in case this field is optional
  isFalse: (field = null) =>
    typeof field !== "undefined" ? field === false : true, // always true when null in case this field is optional
  isEmail: (email = null) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email ? regex.test(email) : true; // always true when null in case this field is optional
  }
};
