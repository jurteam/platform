import React, { useContext } from "react";

import { AppContext } from "../../../bootstrap/AppProvider"; // App Context

import Header from "../../../components/common/Header";
import Logo from "../../../components/common/Logo";
import Unlock from "../../../components/auth/Unlock";

const MetamaskRequired = () => {
  const { metamaskLoading } = useContext(AppContext);

  return !metamaskLoading ? (
    <>
      <Header>
        <Logo />
      </Header>
      <Unlock />
    </>
  ) : null;
};

export default MetamaskRequired;
