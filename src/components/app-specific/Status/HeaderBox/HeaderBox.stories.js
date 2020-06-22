import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import HeaderBox from "./";

const address = "0x602b7a4309b3412d269c6cdddad962c0b94494d8";
const statusType = ["Justinian", "Solomon"];
const createdAt = new Date();

storiesOf("Status", module)
  .addDecorator(withInfo)
  .addParameters({ info: { inline: true, header: false } })
  .add("HeaderBox - Non Holder", () => <HeaderBox address={address} />)
  .add("HeaderBox - Justinian", () => (
    <HeaderBox
      statusType={statusType[0]}
      createdAt={createdAt}
      address={address}
    />
  ))
  .add("HeaderBox - Solomon", () => (
    <HeaderBox
      statusType={statusType[1]}
      createdAt={createdAt}
      address={address}
    />
  ));
