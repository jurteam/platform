import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import Viewer from "./";

storiesOf("Viewer", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("FilePreview", () => (
    <Viewer
      isOpen={true}
      filePath={`${process.env.PUBLIC_URL}/files/prova.pdf`}
      onFileLoadingError={() => alert("file error")}
    />
  ))
  .add("FilePreview full", () => (
    <Viewer
      isOpen={true}
      filePath={`${process.env.PUBLIC_URL}/files/prova.pdf`}
      onFileLoadingError={() => alert("file error")}
      fullWidthViewer
    />
  ))
  .add("FilePreview & Vote Allowed", () => (
    <Viewer
      isOpen={true}
      filePath={`${process.env.PUBLIC_URL}/files/prova.pdf`}
      countdownOptions={{
        days: 0,
        hours: 0,
        minutes: 1,
        startDate: "March 9, 2019 15:27:00",
        statusId: 5,
        expireAlertFrom: 1000 * 60 * 60 * 24,
        onProgress: percentage => console.log(percentage),
        onExpire: () => alert("countdown finished")
      }}
      statusId={35}
      counterparties={[
        {
          wallet: "0x9h8563948567364975369h34789537645",
          name: "Alice",
          renderName: true,
          percentage: 31.4,
          value: 16903,
          winner: false
        },
        {
          wallet: "0xo38765374573497694756473v6936953",
          name: "Bob",
          renderName: false,
          percentage: 40.4,
          value: 1323903,
          winner: false
        }
      ]}
      onVote={counterparty => alert(`Votin for ${counterparty.name}`)}
      onReject={() => alert("Rejected Contract")}
      onFileLoadingError={() => alert("file error")}
    />
  ))
  .add("VoteForm", () => (
    <Viewer
      isOpen={true}
      countdownOptions={{
        days: 0,
        hours: 0,
        minutes: 1,
        startDate: "March 9, 2019 15:27:00",
        statusId: 5,
        expireAlertFrom: 1000 * 60 * 60 * 24,
        onProgress: percentage => console.log(percentage),
        onExpire: () => alert("countdown finished")
      }}
      statusId={35}
      counterparties={[
        {
          wallet: "0x9h8563948567364975369h34789537645",
          name: "Alice",
          renderName: true,
          percentage: 31.4,
          value: 16903,
          winner: false
        },
        {
          wallet: "0xo38765374573497694756473v6936953",
          name: "Bob",
          renderName: false,
          percentage: 40.4,
          value: 1323903,
          winner: false
        }
      ]}
      onVote={counterparty => alert(`Votin for ${counterparty.name}`)}
      onReject={() => alert("Rejected Contract")}
      onFileLoadingError={() => alert("file error")}
      onVoteSubmit={data => console.log(data)}
      metaMaskError={true}
    />
  ));
