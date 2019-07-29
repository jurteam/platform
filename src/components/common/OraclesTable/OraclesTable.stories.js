import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import OraclesTable from "./";

const headers = [
  {
    label: "Oracles"
  },
  {
    label: "Vote"
  },
  {
    label: "Message"
  },
  {
    label: "Evidence"
  },
  {
    label: "Amount"
  },
  {
    label: "Time"
  }
];

const data = [
  {
    ethAddress: "0x380e1e52eb35d4d12d9832afe406dfb010158cfd",
    vote: "0x55fe002aeff02f77364de339a292923a15844b8",
    message:
      "Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato.",
    evidences: [
      {
        name: "file1.pdf"
      }
    ],
    attachments: {
      data: []
    },
    wallet_part: 'a',
    amount: 38974,
    date: "2019-03-08T14:25:44.335Z"
  },
  {
    ethAddress: "0x069c97dba948175d10af4b2414969e0b88d44669",
    vote: "0x55fe002aeff02f77364de39a1292923a15844b8",
    message: "",
    evidences: [],
    attachments: {
      data: []
    },
    wallet_part: 'a',
    amount: 50000,
    date: "2019-03-08T14:25:44.335Z"
  },
  {
    ethAddress: "0x55fe002aeff02f77364de339a1292923a15844b8",
    vote: "0x55fe002eff02f77364de339a1292923a15844b8",
    message: "",
    evidences: [
      { name: "file1 o9cno eri terot skgsdukgfsdgfisi.pdf" },
      { name: "file2.pdf" },
      { name: "file3.pdf" }
    ],
    amount: 38974,
    wallet_part: 'b',
    attachments: {
      data: []
    },
    date: "2019-03-08T14:25:44.335Z"
  },
  {
    ethAddress: "0x55fe002aeff02f77364de339a192923a15844b8",
    vote: "0x55fe02aeff02f77364de339a1292923a15844b8",
    message:
      "Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato.",
    evidences: [],
    amount: 38974,
    wallet_part: 'b',
    attachments: {
      data: []
    },
    date: "2019-03-10T11:25:44.335Z"
  },
  {
    ethAddress: "0xf20b9e713a33f61fa38792d2afaf1cd30339126a",
    vote: "0x42cfc69d0b12bc96589390b8c5dca30e72ebf3f2",
    message:
      "Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato.",
    evidences: [
      {
        name: "file1.pdf"
      }
    ],
    amount: 38974,
    wallet_part: 'b',
    attachments: {
      data: []
    },
    date: "2019-02-08T14:25:44.335Z"
  },
  {
    ethAddress: "0x42cfc69d0b12bc96589390b8c5dca30e72ebf3f2",
    vote:
      "0x55fe002aeff02f77364de0xf20b9e713a33f61fa38792d2afaf1cd30339126a339a1292923a15844b8",
    message:
      "Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato.",
    evidences: [
      {
        name: "file1.pdf"
      }
    ],
    amount: 38974,
    wallet_part: 'a',
    attachments: {
      data: []
    },
    date: "2019-01-08T14:25:44.335Z"
  }
];

storiesOf("OraclesTable", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Default", () => (
    <OraclesTable
      headers={headers}
      data={data}
      currentUserWallet="0x069c97dba948175d10af4b2414969e0b88d44669"
      dispute={{
        name:
          "Alice VS 0x55fe002aeff02f... - Logo Design Contract for electronic cigarettes brand",
        status: {
          id: 31,
          label: "Open Dispute"
        }
      }}
    />
  ));
