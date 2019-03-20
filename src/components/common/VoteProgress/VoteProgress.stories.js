import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import VoteProgress from "./";

storiesOf("VoteProgress", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Vote ongoing & allowed", () => (
    <VoteProgress
      counterparty={{
        wallet: {
          address: "0xie57ht6fh75f4576894"
        },
        name: "Alice",
        shouldRenderName: true,
        percentage: 67.2,
        value: 36133,
        winner: false
      }}
      highlightColor="green"
      OnVote={counterparty => alert(`Votin for ${counterparty.name}`)}
      statusId={35}
      canVote
    />
  ))
  .add("Vote ongoing & not allowed", () => (
    <VoteProgress
      counterparty={{
        wallet: {
          address: "0x9h8563948567364975369h347895693"
        },
        name: "Bob",
        shouldRenderName: false,
        percentage: 31.4,
        value: 16903,
        winner: false
      }}
      highlightColor="blue"
      OnVote={counterparty => alert(`Votin for ${counterparty.name}`)}
      statusId={36}
    />
  ))
  .add("Vote closed & Winner", () => (
    <VoteProgress
      counterparty={{
        wallet: {
          address: "0x9h8563948567364975369h34789537645"
        },
        name: "Bob",
        shouldRenderName: false,
        percentage: 31.4,
        value: 16903,
        winner: true
      }}
      highlightColor="blue"
      OnVote={counterparty => alert(`Votin for ${counterparty.name}`)}
      statusId={39}
    />
  ))
  .add("Vote closed & Loser", () => (
    <VoteProgress
      counterparty={{
        wallet: {
          address: "0x9h8563948567364975369h34789537645"
        },
        name: "Bob",
        shouldRenderName: false,
        percentage: 31.4,
        value: 16903,
        winner: false
      }}
      highlightColor="blue"
      OnVote={counterparty => alert(`Votin for ${counterparty.name}`)}
      statusId={39}
    />
  ));
