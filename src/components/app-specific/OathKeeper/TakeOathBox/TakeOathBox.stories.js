import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import TakeOathBox from "./TakeOathBox";

storiesOf("OathKeeper", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("TakeOathBox", () => <TakeOathBox />);
