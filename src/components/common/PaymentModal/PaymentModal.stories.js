import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import PaymentModal from "./";

storiesOf("PaymentModal", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Reject Payment", () => (
    <PaymentModal title="Reject Payment" content="Lorem ipsum sit dolor consecteuter adipisicing elit." />
  ));
