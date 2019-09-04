import React, { Component } from "react";

import PageLayout from "../PageLayout";
import Main from "../Main";
// import Aside from "../Aside";
import ContractsTable from "../ContractsTable";
import { log } from "../../../utils/helpers";

const contractsTableHeader = [
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

const filters = {
  status: null,
  fromDate: null,
  toDate: null,
  searchText: null,
  disabled: false
};

export class ContractsEmpty extends Component {
  render() {
    return (
      <PageLayout showBreadcrumbs={false}>
        <Main>
          <ContractsTable
            headers={contractsTableHeader}
            data={[]}
            filters={filters}
            handleArchive={contractId => log("Contractid archived", contractId)}
          />
        </Main>
      </PageLayout>
    );
  }
}
