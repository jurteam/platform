import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactModal from "react-modal";

import "./Modal.scss";

export class Modal extends Component {
  render() {
    const {
      isOpen,
      onRequestClose,
      onAfterOpen,
      className,
      ...props
    } = this.props;
    return (
      <ReactModal
        isOpen={isOpen}
        ariaHideApp={false}
        shouldCloseOnEsc={true}
        onRequestClose={onRequestClose}
        onAfterOpen={onAfterOpen}
        className={`jur-modal ${this.props.className || ""}`}
        overlayClassName="jur-modal__overlay"
        {...props}
      >
        {this.props.children}
      </ReactModal>
    );
  }
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func,
  onAfterOpen: PropTypes.func,
  className: PropTypes.string
};
