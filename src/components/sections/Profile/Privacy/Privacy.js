import React, { useState, useContext } from "react"; // eslint-disable-line no-unused-vars
import { drizzleConnect } from "drizzle-react";

import { AppContext } from "./../../../../bootstrap/AppProvider";
import Button from "./../../../../components/common/Button";

const Privacy = (props) => {

  // Context
  const { labels } = useContext(AppContext);

  return (
    <div>
      <div className="jur--block">
        <strong>{labels.disclamer}</strong>
        <hr />
        <p style={{fontSize:"14px",padding:"10px"}}>{labels.disclamerText}</p>
        <Button size="big" color="info">{labels.decline}</Button>
      </div>
      <br />
      <div className="jur--block">
        <strong>{labels.dataManagement}</strong>
        <hr />
        <p style={{fontSize:"14px",padding:"10px"}}>{labels.deleteAllYourContractsText}</p>
        <Button size="big" color="info">{labels.deleteAllYourContracts}</Button>
        <hr />
        <p style={{fontSize:"14px",padding:"10px"}}>{labels.deleteAllYourDisputesText}</p>
        <Button size="big" color="info">{labels.deleteAllYourDisputes}</Button>
      </div>
    </div>
  );
}

export default Privacy;