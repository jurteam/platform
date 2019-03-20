import React, { Component } from "react";
import PropTypes from "prop-types";
import PageLayout from "../PageLayout";
import Main from "../Main";
import Aside from "../Aside";
import CreateContractForm from "../CreateContractForm";
import CounterpartiesInfo from "../CounterpartiesInfo";

const counterparties = [
  {
    wallet: {
      address: "0xlh87re78etn9g8e9gtere9"
    },
    name: "Alice",
    email: "alice@domain.com"
  },
  {
    wallet: {
      address: "0xlh87re7kdhgif9g8e9gtere9"
    },
    name: "Alice",
    email: "alice@domain.com"
  }
];
const title = "Counterparties";
const description =
  "Email address is not mandatory. If you provide your email, you will get notifications during all the different stages of the contract execution and the eventual dispute resolution";

export class CreateContract extends Component {
  render() {
    return (
      <PageLayout showBreadcrumbs={false}>
        <Aside>
          <CounterpartiesInfo title={title} description={description} />
        </Aside>
        <Main>
          <CreateContractForm
            counterparties={counterparties}
            onNext={() => alert("onNext fired")}
          />
        </Main>
      </PageLayout>
    );
  }
}
