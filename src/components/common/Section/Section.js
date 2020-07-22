import React from "react";
import "./Section.scss";
import SpinnerDOM from "../Spinner/SpinnerDOM";

const Section = ({ children, showSpinner }) =>
  showSpinner ? (
    <SpinnerDOM loading={showSpinner} />
  ) : (
    <div className="jur-section">{children}</div>
  );

Section.defaultProps = {
  showSpinner: false
};

export default Section;
