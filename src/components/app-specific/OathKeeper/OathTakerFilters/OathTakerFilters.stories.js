import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import OathTakerFilters from "./";

storiesOf("OathKeeper", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("OathTakerFilters", () => <OathTakerFilters />);
