import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import DisputeSidebar from "./";

storiesOf("DisputeSidebar", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Default", () => (
    <DisputeSidebar
      contract={{
        contractID: 34765,
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
        penaltyFee: null,
        duration:{days:4,hours:6,minutes:45}
      }}
      cases={[
        {
          label: "Open",
          description:
            "On the open layer any token holder can vote. According to our game theory, disputes over contracts with clear Key Performance Indicators and good evidence will result in fair outcomes. There is no incentive for anyone to vote on the wrong side, since there is no extra reward for choosing the unlikely proposition. The system is not corruptible because no one can realistically have 51% of Jur tokens.",
          id: 1
        },
        {
          label: "Hubs",
          description:
            "On the open layer any token holder can vote. According to our game theory, disputes over contracts with clear Key Performance Indicators and good evidence will result in fair outcomes. There is no incentive for anyone to vote on the wrong side, since there is no extra reward for choosing the unlikely proposition. The system is not corruptible because no one can realistically have 51% of Jur tokens.",
          id: 2
        }
      ]}
    />
  ));
