import React from "react";
import { Redirect } from "react-router-dom";

import i18n from "../assets/i18n/en/labels.json"; // i18n

// Sections
import NotFound from "../components/sections/NotFound";
import Home from "../components/sections/Home";

import Profile from "../components/sections/Profile";

import Contracts from "../components/sections/Contracts";
import NewContract from "../components/sections/NewContract";
import ContractDetail from "../components/sections/ContractDetail";

import Disputes from "../components/sections/Disputes";
import DisputeDetail from "../components/sections/DisputeDetail";
import OracleDetail from "../components/sections/OracleDetail";

import OathTakers from "../components/sections/OathTakers";
import StatusHolders from "../components/sections/Status/StatusHolders";

// Helpers
import { redirect, checkConnection } from "../utils/helpers";

export const createRoutes = withComponents => {
  // handle empty params
  if (typeof withComponents === "undefined") {
    withComponents = true;
  }
  return [
    {
      exact: true,
      path: "/",
      onEnter: () => redirect(checkConnection, "/"),
      component: withComponents && Home
    },
    {
      exact: true,
      path: "/profile/faq",
      onEnter: () => redirect(checkConnection, "/profile/faq"),
      component: withComponents && Profile,
      title: i18n.faq
    },
    {
      path: "/profile",
      onEnter: () => redirect(checkConnection, "/profile"),
      component: withComponents && Profile,
      title: i18n.profileSettings
    },
    {
      exact: true,
      path: "/contracts",
      onEnter: () => redirect(checkConnection, "/contracts"),
      component: withComponents && Contracts,
      title: i18n.smartContracts
    },
    {
      exact: true,
      path: "/contracts/new",
      onEnter: () => redirect(checkConnection, "/contracts/new"),
      component: withComponents && NewContract,
      title: i18n.smartContracts
    },
    {
      exact: true,
      path: "/contracts/detail",
      component: () => withComponents && <Redirect to="/contracts" />
    },
    {
      exact: true,
      path: "/contracts/detail/:id",
      onEnter: () => redirect(checkConnection, "/contracts/detail/:id"),
      component: withComponents && ContractDetail,
      title: i18n.smartContracts
    },
    {
      exact: true,
      path: "/disputes",
      onEnter: () => redirect(checkConnection, "/disputes"),
      component: withComponents && Disputes,
      title: i18n.disputes
    },
    {
      exact: true,
      path: "/disputes/detail",
      component: () => withComponents && <Redirect to="/disputes" />
    },
    {
      exact: true,
      path: "/disputes/detail/:id",
      onEnter: () => redirect(checkConnection, "/disputes/detail/:id"),
      component: withComponents && DisputeDetail,
      title: i18n.disputes
    },
    {
      exact: true,
      path: "/disputes/detail/:id/oracles",
      onEnter: () => redirect(checkConnection, "/disputes/detail/:id/oracles"),
      component: withComponents && OracleDetail,
      title: i18n.oraclesDetails
    },
    {
      exact: true,
      path: "/oath-keeper/oath-takers",
      component: withComponents && OathTakers,
      title: i18n.oathTakers
    },
    {
      exact: true,
      path: "/oath-keeper/my-oaths",
      component: withComponents && Profile,
      title: i18n.oathTakers
    },
    {
      exact: true,
      path: "/status/my-status",
      component: withComponents && Profile,
      title: i18n.oathTakers
    },
    {
      exact: true,
      path: "/status/holders",
      component: withComponents && StatusHolders,
      title: i18n.oathTakers
    },
    { component: withComponents && NotFound, title: i18n.notFound }
  ];
};
