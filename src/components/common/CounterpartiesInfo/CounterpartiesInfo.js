import React from "react";


import "./CounterpartiesInfo.scss";

export const CounterpartiesInfo = ( props ) => (
  <div className="jur-counterparties-info">
    <h2>{props.title}</h2>
    <p>{props.description}</p>
  </div>
);
