import React, { useState, useEffect, useContext } from "react";

// Context
import { AppContext } from "../../../bootstrap/AppProvider";

// Components
import PageLayout from "../../common/PageLayout";
import Disclaimer, { ModalDiscliamer } from "../../common/Disclaimer";
import Aside from "../../common/Aside";
import Main from "../../common/Main";
import CounterpartiesInfo from "../../common/CounterpartiesInfo";
import CreateContractForm from "../../common/CreateContractForm";

import { log } from "../../../utils/helpers"; // log helper

import {
  NEW_CONTRACT,
  RESET_CONTRACT,
  DISCLAIMER_MUST_BE_ACCEPTED
} from "../../../reducers/types";

export const NewContract = props => {
  const { labels } = useContext(AppContext);

  const [showModal, setShowModal] = useState(false);

  // reset contract on each new contract creation
  useEffect(() => {
    global.drizzle.store.dispatch({ type: RESET_CONTRACT })
  }, []);

  const initContract = () => {
    log("initContract", "run");
    const {
      user: { disclaimer }
    } = props;
    if (disclaimer.optin) {
      const { history } = props;
      global.drizzle.store.dispatch({ type: NEW_CONTRACT, history });
    } else {
      setShowModal(true); // show disclaimer modal
      global.drizzle.store.dispatch({ type: DISCLAIMER_MUST_BE_ACCEPTED });
    }
  };

  const breadcrumbs = [
    {
      label: labels.contracts,
      to: "/contracts",
      exact: true
    },
    {
      label: labels.createContract,
      active: true,
      to: "/contracts/new"
    }
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <Aside>
        <CounterpartiesInfo
          title={labels.counterparties}
          description={labels.counterpartiesText}
        />
      </Aside>
      <Main>
        <CreateContractForm
          onNext={initContract}
        />
      </Main>

      <ModalDiscliamer
        isOpen={showModal}
        onAccept={() => setShowModal(false)}
        onDecline={() => setShowModal(false)}
      />

      <Disclaimer />
    </PageLayout>
  );
};
