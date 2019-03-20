import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import ContractSetCaseDispute from "./";

storiesOf("ContractSetCaseDispute", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Default", () => (
    <ContractSetCaseDispute
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
      handleChange={selectedOptionId => console.log(selectedOptionId)}
    />
  ));
