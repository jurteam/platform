import React from "react";
import "./Flag.scss";

const Flag = ({ of, className = "" }) => {
  const style = {
    backgroundImage: `url(/assets/flags/${of}.svg)`
  };

  return <div style={style} className={`jur-flag ${className}`} />;
};

export default Flag;
