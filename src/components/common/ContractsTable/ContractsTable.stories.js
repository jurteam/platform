import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import ContractsTable from ".";

const headers = [
  {
    label: "Status",
    sortable: () => alert("sort Status")
  },
  {
    label: "Contract Name",
    sortable: () => alert("sort contract name")
  },
  {
    label: "Duration",
    sortable: () => alert("sort Duration")
  },
  {
    label: "Counterparty details",
    sortable: () => alert("sort counterparty details")
  },
  {
    label: "Value",
    sortable: () => alert("sort Value")
  },
  {
    label: "&nbsp;"
  }
];

const noContracts = [];

const contractsData = [
  {
    id: 0,
    statusId: 0,
    statusLabel: "Draft",
    contractName: "Freelancer Agreement",
    duration: 1000 * 60 * 60 * 24 * 3,
    expireDate: 1000 * 60 * 60 * 24 * 2,
    counterParties: [
      {
        wallet: "0x496730954769357609478509674309",
        name: "Alice",
        renderName: true
      },
      {
        wallet: "0x4967309547693576094785674309",
        name: "Bob",
        renderName: false
      }
    ],
    value: 854667,
    archived: false,
    currency: "JUR"
  },
  {
    id: 1,
    statusId: 1,
    statusLabel: "Waiting for counterparty",
    contractName: "OTC transaction Eth vs Btc",
    duration: 1000 * 60 * 60 * 24 * 3,
    expireDate: 1000 * 60 * 60 * 24 * 2,
    counterParties: [
      {
        wallet: "0x496730954769357609478509674309",
        name: "Alice",
        renderName: true
      },
      {
        wallet: "0x4967309547693576094785674309",
        name: "Bob",
        renderName: false
      }
    ],
    value: 854667,
    archived: false,
    currency: "JUR"
  },
  {
    id: 2,
    statusId: 5,
    statusLabel: "Ongoing",
    contractName: "Web Development Activity",
    duration: 1000 * 60 * 60 * 24 * 3,
    expireDate: 1000 * 60 * 60 * 24 * 2,
    counterParties: [
      {
        wallet: "0x496730954769357609478509674309",
        name: "Alice",
        renderName: true
      },
      {
        wallet: "0x4967309547693576094785674309",
        name: "Bob",
        renderName: false
      }
    ],
    value: 854667,
    archived: false,
    currency: "JUR"
  },
  {
    id: 3,
    statusId: 31,
    statusLabel: "Open Dispute",
    contractName: "Logo Design",
    duration: 1000 * 60 * 60 * 24 * 3,
    expireDate: 1000 * 60 * 60 * 24 * 2,
    counterParties: [
      {
        wallet: "0x496730954769357609478509674309",
        name: "Alice",
        renderName: true
      },
      {
        wallet: "0x4967309547693576094785674309",
        name: "Bob",
        renderName: false
      }
    ],
    value: 854667,
    archived: false,
    currency: "JUR"
  },
  {
    id: 4,
    statusId: 39,
    statusLabel: "Closed Dispute",
    contractName: "Investment Milestone",
    duration: 1000 * 60 * 60 * 24 * 3,
    expireDate: 1000 * 60 * 60 * 24 * 2,
    counterParties: [
      {
        wallet: "0x496730954769357609478509674309",
        name: "Alice",
        renderName: true
      },
      {
        wallet: "0x4967309547693576094785674309",
        name: "Bob",
        renderName: false
      }
    ],
    value: 854667,
    archived: false,
    currency: "JUR"
  },
  {
    id: 5,
    statusId: 39,
    statusLabel: "Closed Dispute",
    contractName: "EU Patent purchasing",
    duration: 1000 * 60 * 60 * 24 * 3,
    expireDate: 1000 * 60 * 60 * 24 * 2,
    counterParties: [
      {
        wallet: "0x496730954769357609478509674309",
        name: "Alice",
        renderName: true
      },
      {
        wallet: "0x4967309547693576094785674309",
        name: "Bob",
        renderName: false
      }
    ],
    value: 854667,
    archived: false,
    currency: "JUR"
  }
];

storiesOf("ContractsTable", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("No contracts", () => (
    <ContractsTable
      headers={headers}
      data={noContracts}
      handleArchive={contractId => alert("Contractid archived")}
      handleFilterChange={value => console.log(value)}
      handleFilterSubmit={console.log("filter contracts")}
      contractsPerPage={3}
      totalContracts={noContracts.length}
      handlePageChange={pageNumber => console.log(pageNumber)}
    />
  ))
  .add("Contract list", () => (
    <ContractsTable
      headers={headers}
      data={contractsData}
      handleArchive={contractId => alert("Contractid archived")}
      handleFilterChange={value => console.log(value)}
      handleFilterSubmit={() => console.log("filter contracts")}
      contractsPerPage={3}
      totalContracts={contractsData.length}
      onPageChange={pageNumber => console.log(pageNumber)}
    />
  ));
