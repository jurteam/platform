import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import AdvocatesPagination from ".";

storiesOf("Status", module)
  .addDecorator(withInfo)
  .addParameters({ info: { inline: true, header: false } })
  .add("AdvocatesPagination", () => (
    <AdvocatesPagination
      onPaginate={e => console.log(e)}
      total={21}
      perPage={10}
      page={2}
    />
  ));
