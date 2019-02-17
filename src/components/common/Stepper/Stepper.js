import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class Stepper extends Component {
  render() {
    const {
      activeStep,
      children
    } = this.props;
    const childrenArray = React.Children.toArray(children);
    const steps = childrenArray.map((step, index) => {
      const state = {
        index,
        active: activeStep === index,
        last: index + 1 === childrenArray.length
      };
      return React.cloneElement(step, { ...state, ...step.props });
    });
    console.log('render stepper');
    return (
      <div className="jur-stepper">
        {steps}
      </div>
    )
  }
}

Stepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
  children: PropTypes.node,
};

Stepper.defaultProps = {
  activeStep: 0
};