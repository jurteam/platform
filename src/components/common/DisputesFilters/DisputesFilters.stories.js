import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import DisputesFilters from ".";

storiesOf("DisputesFilters", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Default", () => (
    <DisputesFilters
      getAllDisputes={() => console.log("get all disputes")}
      getMyDisputes={() => console.log("get mys disputes")}
      onChange={(value) => console.log(value)}
      onSubmit={() => console.log("filter submit")}
    />
  ));
