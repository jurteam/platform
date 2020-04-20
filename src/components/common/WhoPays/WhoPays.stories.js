import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { log } from "../../../utils/helpers";

import WhoPays from "./";

storiesOf("WhoPays", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Default", () => (
    <WhoPays
      contract={{
        from: {
          label: "partA",
          debtor: true,
          wallet: "0xh845684f893689fh56347563fh3486539463",
          name: "Alice",
          shouldRenderName: true
        },
        to: {
          label: "partB",
          debtor: false,
          wallet: "0x38683746f893457h6fh563487fh569834596",
          name: "Bob",
          shouldRenderName: false
        },
        amount: 857000,
        penaltyFee: {
          partA: 8654,
          partB: 1123
        }
      }}
      hasError={() => null}
      handleSelectPayer={value => log(value)}
    />
  ))
  .add("Error", () => (
    <WhoPays
      error={true}
      errorMsg={"You do not have enough Jur balance"}
      contract={{
        from: {
          label: "partA",
          debtor: true,
          wallet: "0xh845684f893689fh56347563fh3486539463",
          name: "Alice",
          shouldRenderName: true
        },
        to: {
          label: "partB",
          debtor: false,
          wallet: "0x38683746f893457h6fh563487fh569834596",
          name: "Bob",
          shouldRenderName: false
        },
        penaltyFee: {
          partA: 8654,
          partB: 1123
        }
      }}
      handleSelectPayer={value => log(value)}
    />
  ));
