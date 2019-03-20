import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import DisputeVote from "./";

storiesOf("DisputeVote", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Vote onGoing Vote Allowed", () => (
    <DisputeVote
      title="Who do you think is right?"
      statusId={35}
      counterparties={[
        {
          wallet: {
            address: "0x9h8563948567364975369h34789537645"
          },
          name: "Alice",
          shouldRenderName: true,
          percentage: 31.4,
          value: 16903,
          winner: false
        },
        {
          wallet: {
            address: "0xo38765374573497694756473v6936953"
          },
          name: "Bob",
          shouldRenderName: false,
          percentage: 40.4,
          value: 1323903,
          winner: false
        }
      ]}
      onVote={counterparty => alert(`Votin for ${counterparty.name}`)}
      onReject={() => alert("Rejected Contract")}
      canVote={true}
    />
  ))
  .add("Vote onGoing Vote not Allowed", () => (
    <DisputeVote
      title="Who do you think is right?"
      statusId={35}
      counterparties={[
        {
          wallet: {
            address: "0x9h8563948567364975369h34789537645"
          },
          name: "Alice",
          shouldRenderName: true,
          percentage: 31.4,
          value: 16903,
          winner: false
        },
        {
          wallet: {
            address: "0xo38765374573497694756473v6936953"
          },
          name: "Bob",
          shouldRenderName: false,
          percentage: 40.4,
          value: 1323903,
          winner: false
        }
      ]}
      onVote={counterparty => alert(`Votin for ${counterparty.name}`)}
      onReject={() => alert("Rejected Contract")}
      canVote={false}
    />
  ))
  .add("Vote Closed. Winner", () => (
    <DisputeVote
      title="Voting"
      statusId={39}
      currentUserWallet="0xo38765374573497694756473v6936953"
      counterparties={[
        {
          wallet: {
            address: "0x9h8563948567364975369h34789537645"
          },
          name: "Alice",
          shouldRenderName: true,
          percentage: 31.4,
          value: 16903,
          winner: false
        },
        {
          wallet: {
            address: "0xo38765374573497694756473v6936953"
          },
          name: "Bob",
          shouldRenderName: false,
          percentage: 40.4,
          value: 1323903,
          winner: true
        }
      ]}
      onVote={counterparty => alert(`Votin for ${counterparty.name}`)}
      onReject={() => alert("Rejected Contract")}
      canVote={false}
      gainedValue={1234}
    />
  ))
  .add("Vote Closed. Loser", () => (
    <DisputeVote
      title="Voting"
      statusId={39}
      currentUserWallet="0xo38765374573497694756473v6936953"
      counterparties={[
        {
          wallet: {
            address: "0x9h8563948567364975369h34789537645"
          },
          name: "Alice",
          shouldRenderName: true,
          percentage: 31.4,
          value: 16903,
          winner: true
        },
        {
          wallet: {
            address: "0xo38765374573497694756473v6936953"
          },
          name: "Bob",
          shouldRenderName: false,
          percentage: 40.4,
          value: 1323903,
          winner: false
        }
      ]}
      onVote={counterparty => alert(`Votin for ${counterparty.name}`)}
      onReject={() => alert("Rejected Contract")}
      canVote={false}
      lossedValue={1234}
    />
  ));
