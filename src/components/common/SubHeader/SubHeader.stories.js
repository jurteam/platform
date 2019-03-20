import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import Breadcrumbs from "../Breadcrumbs";
import Button from "../Button";
import ResolvedDisputeNotification from "../ResolvedDisputeNotification";
import SubHeader from "./";

const crumbList = [
  {
    id: 0,
    label: "Contracts",
    to: "/contracts"
  },
  {
    id: 1,
    label: "Create smart contract",
    to: "/create"
  }
];

storiesOf("SubHeader", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Default", () => <SubHeader>hello world</SubHeader>)
  .add("with breadcrumb", () => (
    <SubHeader>
      <Breadcrumbs crumbList={crumbList} />
    </SubHeader>
  ))
  .add("with breadcrumb and button", () => (
    <SubHeader>
      <Breadcrumbs crumbList={crumbList} />
      <Button variant="contained">Hello</Button>
    </SubHeader>
  ))
  .add("with breadcrumb and resolved dispute notification", () => (
    <SubHeader>
      <Breadcrumbs crumbList={crumbList} />
      <ResolvedDisputeNotification />
    </SubHeader>
  ));
