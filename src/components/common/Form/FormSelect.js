import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

export const FormSelect = ({name, id, options, onChange, ...rest}) => {
  const customStyles = {
    control: styles => ({
      ...styles,
      backgroundColor: 'white',
      border: '1px solid #EAEBEC',
      borderRadius: 2,
      maxHeight: 36,
      height: 36,
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
      color: '#97A3B4',
      fontSize: 13,
    }),
    valueContainer: styles => ({
      ...styles,
      fontFamily: '"Poppins", Arial, sans-serif',
      color: '#002257',
      fontSize: 13,
      maxHeight: 36,
      height: 36,
    }),
    singleValue: styles => ({
      ...styles,
      color: '#002257',
      position: 'relative',
      top: 0,
      transform: 'translateY(0)'
    }),
    input: styles => ({
      ...styles,
      ' input': {
        height: '100%'
      }
    })
  };

  return (
    <Select
      className="jur-select"
      name={name}
      id={id}
      styles={customStyles}
      isSearchable={true}
      isClearable={true}
      options={options}
      onChange={selectedOption => onChange(selectedOption)}
      {...rest}
    />
  );
};