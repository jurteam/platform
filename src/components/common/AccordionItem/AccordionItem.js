import React from "react";
import PropTypes from "prop-types";

export const AccordionItem = ({ active, question, children, onClick }) => (
  <li
    className={`jur-accordion__item ${
      active ? "jur-accordion__item--active" : ""
    }`}
  >
    <div className="jur-accordion__item__header" onClick={() => onClick()}>
      {question}
    </div>
    <div className="jur-accordion__item__content">{children}</div>
  </li>
);
