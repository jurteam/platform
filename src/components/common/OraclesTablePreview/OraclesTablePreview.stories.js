import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import OraclesTablePreview from "./";

const headers = [
  {
    label: "ETH address"
  },
  {
    label: "Vote"
  },
  {
    label: "Msg"
  },
  {
    label: "Amount"
  },
  {
    label: "Time"
  },
];

const data = [
  {
    ethAddress: "0x380e1e52eb35d4d12d9832afe406dfb010158cfd",
    wallet_part: "0x55fe002aeff02f77364de339a292923a15844b8",
    message: "Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato.",
    evidences: [{
      name: "file1.pdf",
    }],
    amount: 38974,
    oracle_wallet: "0x42cfc69d0b12bc96589390b8c5dca30e72ebf3f2",
    attachments: {
      data: []
    },
    date: "2019-03-08T14:25:44.335Z"
  },
  {
    ethAddress: '0x069c97dba948175d10af4b2414969e0b88d44669',
    wallet_part: '0x55fe002aeff02f77364de39a1292923a15844b8',
    message: '',
    evidences: [],
    oracle_wallet: "0x42cfc69d0b12bc96589390b8c5dca30e72ebf3f2",
    amount: 50000,
    date: "2019-03-08T14:25:44.335Z"
  },
  {
    ethAddress: "0x55fe002aeff02f77364de339a1292923a15844b8",
    wallet_part: "0x55fe002eff02f77364de339a1292923a15844b8",
    message: '',
    evidences: [
      { name: "file1.pdf" },
      { name: "file2.pdf" },
      { name: "file3.pdf" }
    ],
    amount: 38974,
    oracle_wallet: "0x42cfc69d0b12bc96589390b8c5dca30e72ebf3f2",
    attachments: {
      data: []
    },
    date: "2019-03-08T14:25:44.335Z"
  },
  {
    ethAddress: "0x55fe002aeff02f77364de339a192923a15844b8",
    wallet_part: "0x55fe02aeff02f77364de339a1292923a15844b8",
    message: "Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato.",
    evidences: [],
    amount: 38974,
    oracle_wallet: "0x42cfc69d0b12bc96589390b8c5dca30e72ebf3f2",
    attachments: {
      data: []
    },
    date: "2019-03-10T11:25:44.335Z"
  },
  {
    ethAddress: "0xf20b9e713a33f61fa38792d2afaf1cd30339126a",
    wallet_part: "0x42cfc69d0b12bc96589390b8c5dca30e72ebf3f2",
    message: "Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato.",
    evidences: [{
      name: "file1.pdf",
    }],
    amount: 38974,
    oracle_wallet: "0x42cfc69d0b12bc96589390b8c5dca30e72ebf3f2",
    attachments: {
      data: []
    },
    date: "2019-02-08T14:25:44.335Z"
  },
  {
    ethAddress: "0x42cfc69d0b12bc96589390b8c5dca30e72ebf3f2",
    wallet_part: "0x55fe002aeff02f77364de0xf20b9e713a33f61fa38792d2afaf1cd30339126a339a1292923a15844b8",
    message: "Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato.",
    evidences: [{
      name: "file1.pdf",
    }],
    amount: 38974,
    oracle_wallet: "0x42cfc69d0b12bc96589390b8c5dca30e72ebf3f2",
    attachments: {
      data: []
    },
    date: "2019-01-08T14:25:44.335Z"
  }
];

storiesOf("OraclesTablePreview", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Default", () => (
    <OraclesTablePreview
      headers={headers}
      data={data}
      currentUserWallet="0x069c97dba948175d10af4b2414969e0b88d44669"
      viewAllDetails="/disputes"
    />
  ))


