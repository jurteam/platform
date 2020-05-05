import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import YourOathsBox from "./";

const oaths = [
  {
    amount: 12,
    lockInPeriod: 3,
    startAt: "1588582376",
    releaseAt: "1788682376",
    oathIndex: 1,
    isFulfilled: false
  },
  {
    amount: 890,
    lockInPeriod: 3,
    startAt: "1548482376",
    releaseAt: "1588582376",
    oathIndex: 2,
    isFulfilled: false
  }
];

storiesOf("OathKeeper", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("YourOathsBox", () => <YourOathsBox oaths={oaths} />);
