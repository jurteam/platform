import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import DisputesTable from ".";

const headers = [
  {
    label: "Status",
    sortable: () => alert("sort Status")
  },
  {
    label: "Dispute Name",
    sortable: () => alert("sort dispute name")
  },
  {
    label: "Duration",
    sortable: () => alert("sort Duration")
  },
  {
    label: "Category",
    sortable: () => alert("sort category")
  },
  {
    label: "Contract Value",
    sortable: () => alert("sort Contract Value")
  },
  {
    label: "Earning",
    sortable: () => alert("sort Earning Value")
  }
];

const disputesData = [
  {
    id: 0,
    statusId: 21,
    statusLabel: "Open Dispute",
    disputeName:
      "0x55fe002aeff02f... VS 0xeb7827abea70c8… OTC Transaction ETH vs BTC",
    duration: 1000 * 60 * 60 * 24 * 2,
    category: "OTC transactions",
    contractValue: 30000,
    earning: null
  },
  {
    id: 1,
    statusId: 39,
    statusLabel: "Closed Dispute",
    disputeName:
      "0x55fe002aeff02f... VS 0xeb7827abea70c8… OTC Transaction ETH vs BTC",
    duration: 1000 * 60 * 60 * 24 * 2,
    category: "OTC transactions",
    contractValue: 13000,
    earning: 30.66
  }
];

storiesOf("DisputesTable", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Disputes unavailable", () => (
    <DisputesTable headers={headers} data={[]} />
  ))
  .add("My Disputes unavailable", () => (
    <DisputesTable
      headers={headers}
      data={[]}
      myDisputes
      getAllDisputes={() => console.log("get all disputes")}
      getMyDisputes={() => console.log("get my disputes")}
      handleFilterChange={value => console.log(value)}
      handleFilterSubmit={() => console.log("submit filters")}
    />
  ))
  .add("Disputes available", () => (
    <DisputesTable
      headers={headers}
      data={disputesData}
      getAllDisputes={() => console.log("get all disputes")}
      getMyDisputes={() => console.log("get my disputes")}
      handleFilterChange={value => console.log(value)}
      handleFilterSubmit={() => console.log("submit filters")}
    />
  ));
