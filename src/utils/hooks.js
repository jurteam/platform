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

  const getFieldValue = (needle, haystack) => {

    let subs;
    let value = null;

    if (needle) {
      if (needle.indexOf('.')) {
        subs = needle.split(".")
        value = haystack;
        for (var i = 0; i < subs.length; i++) {
          value = value[subs[i]]
        }
      } else {
        value = haystack[needle];
      };

      return value;
    }

    return false;
  };

  const validateForm = () => {
    let newErrors = [];

    // for each field
    schema.map(field => {
      if (typeof field.checks !== "undefined") {
        field.checks.map(checkName => {
          let checkPass = true; // fallback

          // field value
          const fieldValue = getFieldValue(field.name, formData);

          if (checkName === "duration") {
            // duration
            const daysFieldValue = getFieldValue(field.days, formData);
            const hoursFieldValue = getFieldValue(field.hours, formData);
            const minutesFieldValue = getFieldValue(field.minutes, formData);

            checkPass = FormValidation[checkName](
              daysFieldValue,
              hoursFieldValue,
              minutesFieldValue
            ); // add target field
          } else if (checkName === "isEqualTo" || checkName === "isNotEqualTo") {

            // target field value
            const targetFieldValue = getFieldValue(field.targetField, formData);

            checkPass = FormValidation[checkName](
              fieldValue,
              targetFieldValue
            ); // add target field

          } else {
            checkPass = FormValidation[checkName](fieldValue);
          }

          if (!checkPass) {
            if (typeof newErrors[field.name] === "undefined") {
              newErrors[field.name] = [checkName];
            } else {
              newErrors[field.name].push(checkName);
            }
          } else {
            if (
              typeof newErrors[field.name] !== "undefined" &&
              typeof newErrors[field.name][checkName] !== "undefined"
            ) {
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
  required: field =>
    typeof field !== "undefined" && field !== "" && field !== null
      ? true
      : false,
  requiredStrict: field => (typeof field !== "undefined" && field) ? true : false,
  requiredNum: field => (typeof field !== "undefined" && field && parseFloat(field) > 0) ? true : false,
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
  },
  isEqualTo: (field, target) => {
    return field ? String(field).toLowerCase() === String(target).toLowerCase() : true; // always true when null in case this field is optional
  },
  isNotEqualTo: (field, target) => {
    return field ? String(field).toLowerCase() !== String(target).toLowerCase() : true; // always true when null in case this field is optional
  },
  duration: (days, hours, minutes) => {
    return (days || hours || minutes) ? true : false;
  }
};
