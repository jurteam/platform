import React, { useContext } from "react";

import { AppContext } from "../../../bootstrap/AppProvider"; // App Context

import Unlock from "../../../components/auth/Unlock";

const MetamaskRequired = () => {
  const { metamaskLoading } = useContext(AppContext);

  return !metamaskLoading ? (
    <>
      <Unlock />
    </>
  ) : null;
};

export default MetamaskRequired;
