import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { log } from "../../../utils/helpers";

import PriceRange from "./";

storiesOf("PriceRange", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Default", () => (
    <PriceRange
      min={0}
      max={326433}
      address="0xi8756435749843798734"
      defaultValue={0}
      onChange={value => log(value)}
    />
  ));
