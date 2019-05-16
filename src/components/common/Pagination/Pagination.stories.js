import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { StateDecorator, Store } from "@sambego/storybook-state";

import Pagination from "./";

const store = new Store({
  activePage: 5
});

storiesOf("Pagination", module)
  .addDecorator(withInfo)
  .addDecorator(StateDecorator(store))
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Default", () => (
    <Pagination
      activePage={1}
      itemsCountPerPage={10}
      totalItemsCount={100}
      handlePageChange={pageNumber => {}}
      getPageUrl={() => "#1"}
    />
  ));
