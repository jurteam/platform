import i18n from "./../assets/i18n/en.json"; // i18n

// Sections
import NotFound from "../components/sections/NotFound";
import Home from "../components/sections/Home";

import Profile from "../components/sections/Profile";

import Contracts from "../components/sections/Contracts";
import Disputes from "../components/sections/Disputes";

// Helpers
import { redirect, checkConnection } from "./../utils/helpers";

export const createRoutes = withComponents => {
  // handle empty params
  if (typeof withComponents === "undefined") withComponents = true;
  return [
    {
      exact: true,
      path: "/",
      onEnter: () => redirect(checkConnection, "/"),
      component: withComponents && Home
    },
    {
      path: "/profile",
      onEnter: () => redirect(checkConnection, "/profile"),
      component: withComponents && Profile,
      title: i18n.profileSettings
    },
    {
      exact: true,
      path: "/profile/faq",
      onEnter: () => redirect(checkConnection, "/profile/faq"),
      component: withComponents && Profile,
      title: i18n.faq
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
      path: "/disputes",
      onEnter: () => redirect(checkConnection, "/disputes"),
      component: withComponents && Disputes,
      title: i18n.disputes
    },
    { component: withComponents && NotFound, title: i18n.notFound }
  ];
};
