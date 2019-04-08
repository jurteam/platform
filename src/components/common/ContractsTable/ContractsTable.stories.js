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
    to: '/1',
    id: 0,
    statusId: 0,
    statusLabel: "Draft",
    contractName: "Freelancer Agreement",
    duration: 1000 * 60 * 60 * 24 * 3,
    expireDate: 1000 * 60 * 60 * 24 * 2,
    counterparties: [
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
    currency: "JUR",
    duration: {
      days: 9,
      hours: 6,
      minutes: 30
    }
  },
  {
    to: '/2',
    id: 1,
    statusId: 1,
    statusLabel: "Waiting for counterparty",
    statusUpdatedAt: 1554487773000,
    contractName: "OTC transaction Eth vs Btc",
    duration: 1000 * 60 * 60 * 24 * 3,
    expireDate: 1000 * 60 * 60 * 24 * 2,
    counterparties: [
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
    currency: "JUR",
    duration: {
      days: 9,
      hours: 6,
      minutes: 30
    }
  },
  {
    to: '/3',
    id: 2,
    statusId: 5,
    statusLabel: "Ongoing",
    contractName: "Web Development Activity",
    statusUpdatedAt: 1554487773000,
    duration: 1000 * 60 * 60 * 24 * 3,
    expireDate: 1000 * 60 * 60 * 24 * 2,
    counterparties: [
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
    currency: "JUR",
    duration: {
      days: 9,
      hours: 6,
      minutes: 30
    }
  },
  {
    to: '/4',
    id: 3,
    statusId: 31,
    statusLabel: "Open Dispute",
    contractName: "Logo Design",
    statusUpdatedAt: 1554487773000,
    duration: 1000 * 60 * 60 * 24 * 3,
    expireDate: 1000 * 60 * 60 * 24 * 2,
    counterparties: [
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
    currency: "JUR",
    duration: {
      days: 9,
      hours: 6,
      minutes: 30
    }
  },
  {
    to: '/5',
    id: 4,
    statusId: 39,
    statusLabel: "Closed Dispute",
    contractName: "Investment Milestone",
    statusUpdatedAt: 1554487773000,
    duration: 1000 * 60 * 60 * 24 * 3,
    expireDate: 1000 * 60 * 60 * 24 * 2,
    counterparties: [
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
    currency: "JUR",
    duration: {
      days: 9,
      hours: 6,
      minutes: 30
    }
  },
  {
    to: '/6',
    id: 5,
    statusId: 39,
    statusLabel: "Closed Dispute",
    contractName: "EU Patent purchasing",
    statusUpdatedAt: 1554487773000,
    duration: 1000 * 60 * 60 * 24 * 3,
    expireDate: 1000 * 60 * 60 * 24 * 2,
    counterparties: [
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
    currency: "JUR",
    duration: {
      days: 9,
      hours: 6,
      minutes: 30
    }
  }
];

const filters = {
  status: null,
  fromDate: null,
  toDate: null,
  searchText: null,
  disabled: false
};

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
      filters={filters}
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
      filters={filters}
      loading={false}
      totalContracts={contractsData.length}
      onPageChange={pageNumber => console.log(pageNumber)}
    />
  ));
