import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { log } from "../../../utils/helpers";

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
      getAllDisputes={() => log("get all disputes")}
      getMyDisputes={() => log("get mys disputes")}
      onChange={value => log(value)}
      onSubmit={() => log("filter submit")}
    />
  ));
