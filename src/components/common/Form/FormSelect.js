import React from "react";

import Select from "react-select";
import Form from "./";

export const FormSelect = ( props ) => {
  const {
    name,
    id,
    options,
    onChange,
    error,
    errorMsg,
    ...rest
  } = props;
  const customStyles = {
    control: styles => ({
      ...styles,
      backgroundColor: "white",
      border: "1px solid #EAEBEC",
      boxShadow: "none",
      borderRadius: 2,
      minHeight: 36,
      maxHeight: 36,
      height: 36,
      "&:hover": {
        border: "1px solid #EAEBEC"
      }
    }),
    option: (styles, state) => ({
      ...styles,
      fontFamily: '"Poppins", Arial, sans-serif',
      color: "#002257",
      fontSize: 13,
      fontWeight: state.isSelected ? 600 : 400,
      backgroundColor: state.isSelected ? "white" : "white",
      "&:hover": {
        backgroundColor: "#E5E5E5"
      }
    }),
    placeholder: styles => ({
      ...styles,
      fontFamily: '"Poppins", Arial, sans-serif',
      color: "#97A3B4",
      fontSize: 13
    }),
    valueContainer: styles => ({
      ...styles,
      fontFamily: '"Poppins", Arial, sans-serif',
      color: "#002257",
      fontSize: 13,
      maxHeight: 36,
      height: 36
    }),
    singleValue: styles => ({
      ...styles,
      color: "#002257",
      position: "relative",
      top: 0,
      transform: "translateY(0)",
      maxWidth: "calc(100% - 10px)"
    }),
    input: styles => ({
      ...styles,
      " input": {
        height: "100%"
      }
    })
  };

  return (
    <>
      <Select
        className={`jur-select ${error ? "jur-select--error" : ""}`}
        classNamePrefix="jur-select"
        name={name}
        id={id}
        styles={customStyles}
        isSearchable={true}
        isClearable={true}
        options={options}
        onChange={selected(option) => onChange(selectedOption)}
        {...rest}
      />
      {error && errorMsg && <Form.ErrorMsg msg={errorMsg} />}
    </>
  );
};
