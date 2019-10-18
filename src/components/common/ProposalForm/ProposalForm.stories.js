import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import ProposalForm from "./";

storiesOf("ProposalForm", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Default", () => (
    <ProposalForm
      description="Before opening a dispute, propose a friendly resolution to the other party. Perhaps you can agree on some fair solution for both."
      currentUserWallet="0x8h348756834b56784587653b874bb"
      contract={{
        value: 7658765,
        from: {
          proposal: 3608765,
          name: "Alice",
          wallet: "0x8h348756834b56784587653b874bb"
        },
        to: {
          proposal: 276576,
          wallet: "0x8h847658735836547865r83548765"
        }
      }}
      onSubmit={data => log(data)}
    />
  ))
  .add("Extended without Files", () => (
    <ProposalForm
      description="Before opening a dispute, propose a friendly resolution to the other party. Perhaps you can agree on some fair solution for both."
      currentUserWallet="0x8h348756834b56784587653b874bb"
      contract={{
        value: 7658765,
        from: {
          proposal: 3608765,
          name: "Alice",
          wallet: "0x8h348756834b56784587653b874bb"
        },
        to: {
          proposal: 276576,
          wallet: "0x8h847658735836547865r83548765"
        }
      }}
      extended
      onSubmit={data => log(data)}
    />
  ))
  .add("Extended Files", () => (
    <ProposalForm
      description="Before opening a dispute, propose a friendly resolution to the other party. Perhaps you can agree on some fair solution for both."
      currentUserWallet="0x8h348756834b56784587653b874bb"
      contract={{
        value: 7658765,
        from: {
          proposal: 3608765,
          name: "Alice",
          wallet: "0x8h348756834b56784587653b874bb"
        },
        to: {
          proposal: 276576,
          wallet: "0x8h847658735836547865r83548765"
        }
      }}
      evidences={[{ name: "file1.pdf" }, { name: "file2.pdf" }]}
      extended
      onSubmit={data => log(data)}
    />
  ));
