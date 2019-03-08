import React, { useState, useEffect } from "react";

import { log } from "./helpers"; // log helper

export const useFormValidation = (data, schema) => {
  const [formData, setFormData] = useState(data);
  const [formValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    validateForm();
    log("useFormValidation - effect", "run");
  }, [data]);

  const validateForm = () => {
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
            let newErrors = [...errors];
            if (typeof newErrors[field.name] === "undefined") {
              newErrors[field.name] = [checkName];
            } else {
              newErrors[field.name].push(checkName);
            }

            setErrors(newErrors);
          }
        });
      }
    });
  };

  return [formValid, errors, validateForm, formData];
};

const FormValidation = {
  required: (field = null) => typeof field !== "undefined" && field,
  isEmail: (email = null) => {
    log("useFormValidation - email", email);
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }
};
