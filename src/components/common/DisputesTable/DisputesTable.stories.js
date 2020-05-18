import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { log } from "../../../utils/helpers";

import DisputesTable from ".";

const headers = [
  {
    label: "Status",
    className: "jur-col--status",
    sortable: () => alert("sort Status")
  },
  {
    label: "Dispute Name",
    className: "jur-col--dispute-name",
    sortable: () => alert("sort dispute name")
  },
  {
    label: "Duration",
    className: "jur-col--duration",
    sortable: () => alert("sort Duration")
  },
  {
    label: "Category",
    className: "jur-col--category",
    sortable: () => alert("sort category")
  },
  {
    label: "Contract Value",
    className: "jur-col--amount",
    sortable: () => alert("sort Contract Value")
  },
  {
    label: "Earning",
    className: "jur-col--earning",
    sortable: () => alert("sort Earning Value")
  }
];

const disputesData = [
  {
    to: "/0",
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
    to: "/1",
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
      getAllDisputes={() => log("get all disputes")}
      getMyDisputes={() => log("get my disputes")}
      handleFilterChange={value => log(value)}
      handleFilterSubmit={() => log("submit filters")}
    />
  ))
  .add("Disputes available", () => (
    <DisputesTable
      headers={headers}
      data={disputesData}
      getAllDisputes={() => log("get all disputes")}
      getMyDisputes={() => log("get my disputes")}
      handleFilterChange={value => log(value)}
      handleFilterSubmit={() => log("submit filters")}
    />
  ));
