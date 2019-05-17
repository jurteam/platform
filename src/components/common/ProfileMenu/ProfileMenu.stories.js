import React from "react";
import { Route } from "react-router-dom";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import ProfileMenu from "./";

const ChildId = ({ match }) => (
  <div>
    <h3>ID: {match.params.id}</h3>
  </div>
);

const menu = [
  {
    id: 0,
    label: "Profile Settings",
    to: "/profile"
  },
  {
    id: 1,
    label: "Privacy",
    to: "/privacy"
  },
  {
    id: 2,
    label: "FAQ's",
    to: "/faq"
  },
  {
    id: 3,
    label: "Term of Service",
    to: "/terms"
  }
];

storiesOf("ProfileMenu", module).add("Default", () => (
  <>
    <ProfileMenu menuList={menu} />
    <Route path="/:id" component={ChildId} />
  </>
));
