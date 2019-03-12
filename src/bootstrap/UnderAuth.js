import React, { useContext } from "react";

import { AppContext } from "./AppProvider"; // App Context

import MetamaskRequired from "../components/sections/MetamaskRequired"; // auth fallback component

const UnderAuth = ({children}) => {
  const { onNetwork } = useContext(AppContext);

  return onNetwork ? children : <MetamaskRequired />;
};

export default UnderAuth;
