import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import MyOathsHeaderBox from "./";

const address = "0x4842e37e90e777b82dd7190499";
const balance = 6654.9;
const rank = 8;
const oaths = [];

storiesOf("OathKeeper", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("MyOathsHeaderBox", () => (
    <MyOathsHeaderBox
      address={address}
      balance={balance}
      rank={rank}
      oaths={oaths}
    />
  ));
