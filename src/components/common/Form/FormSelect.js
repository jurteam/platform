import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

export const FormSelect = ({name, id, options, ...rest}) => {
  const customStyles = {
    control: styles => ({
      ...styles,
      backgroundColor: 'white',
      height: 40,
      border: '1px solid #EAEBEC',
      borderRadius: 2,
      paddingTop: 0,
      paddingBottom: 0,
      '&:hover': {
        border: '1px solid #EAEBEC',
      }
    }),
    option: (styles, state) => ({
      ...styles,
      fontFamily: '"Poppins", Arial, sans-serif',
      color: '#002257',
      fontSize: 13,
      fontWeight: state.isSelected ? 600 : 400,
      backgroundColor: state.isSelected ? 'white' : 'white',
      '&:hover': {
        backgroundColor: '#E5E5E5',
      }

    }),
    placeholder: styles => ({
      ...styles,
      fontFamily: '"Poppins", Arial, sans-serif',
      color: '#002257',
      fontSize: 13
    }),
    valueContainer: styles => ({
      ...styles,
      height: 40,
      paddingTop: 0,
      paddingBottom: 0,
      fontFamily: '"Poppins", Arial, sans-serif',
      color: '#002257',
      fontSize: 13
    })
  };

  return (
    <Select
      name={name}
      id={id}
      styles={customStyles}
      isSearchable={true}
      isClearable={true}
      options={options}
      {...rest}
    />
  );
};