import React from "react";


export const AccordionItem = ( props ) => (
  <li
    className={`jur-accordion__item ${
      props.active ? "jur-accordion__item--active" : ""
    }`}
  >
    <div className="jur-accordion__item__header" onClick={() => props.onClick()}>
      {props.question}
    </div>
    <div className="jur-accordion__item__content">{props.children}</div>
  </li>
);
