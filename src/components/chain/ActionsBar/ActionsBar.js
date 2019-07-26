/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import Amount from "../../common/Amount";

// Context
import { AppContext } from "../../../bootstrap/AppProvider";

// Style
import "./ActionsBar.scss"; // load scss properly
import {
  CHAIN_CREATE_ARBITRATION,
  CHAIN_APPROVE_JURTOKEN,
  CHAIN_SIGN_ARBITRATION,
  REJECT_ARBITRATION,
  CHAIN_AGREE_ARBITRATION,
  CHAIN_WITHDRAW_DISPERSAL_ARBITRATION
} from "../../../reducers/types";

export const ActionsBar = props => {
  const { wallet } = props;
  const { balance } = wallet;

  const createArbitration = () => {
    console.log("createArbitration - call");
    global.drizzle.store.dispatch({
      type: CHAIN_CREATE_ARBITRATION
    });
  };

  const approveToken = (amount) => {
    console.log("approveToken - call");
    amount = amount * 1000000000000000000; // 18 decimals

    global.drizzle.store.dispatch({
      type: CHAIN_APPROVE_JURTOKEN,
      amount
    });
  };

  const rejectArbitration = () => {
    console.log("rejectArbitration - call");
    global.drizzle.store.dispatch({
      type: REJECT_ARBITRATION
    });
  };

  const signArbitration = () => {
    console.log("signArbitration - call");
    global.drizzle.store.dispatch({
      type: CHAIN_SIGN_ARBITRATION,
      contractAddress: "0xefFc163f346011cbFeb4BdD642B833D8B50dED1b"
    });
  };

  const agreeArbitration = () => {
    console.log("agreeArbitration - call");
    global.drizzle.store.dispatch({
      type: CHAIN_AGREE_ARBITRATION,
      contractAddress: "0xefFc163f346011cbFeb4BdD642B833D8B50dED1b"
    });
  };

  const withdrawFromArbitration = () => {
    console.log("withdrawFromArbitration - call");
    global.drizzle.store.dispatch({
      type: CHAIN_WITHDRAW_DISPERSAL_ARBITRATION,
      contractAddress: "0xefFc163f346011cbFeb4BdD642B833D8B50dED1b"
    });
  };

  return (
    <>
      <div className="jur--actions--container">
        <h5>Actions Bar – Simple Contract</h5>
        <div className="jur--actions--inner-container">
          <button onClick={createArbitration}>
            1. createArbitration() + Get Contract [arbitration]
          </button>
          <button onClick={() => approveToken(10)}>2.1 approve() [JURToken]</button>
          <button onClick={rejectArbitration}>
            2.2 reject – approve(0) [JURToken]
          </button>
          <button onClick={signArbitration}>
            3. sign() – pay [arbitration]
          </button>
          <button onClick={agreeArbitration}>4.1 agree() [arbitration]</button>
          <button onClick={withdrawFromArbitration}>5. withdrawDispersal() [arbitration]</button>
        </div>
      </div>
      <div className="jur--actions--container">
        <h5>Actions Bar – Dispute Contract</h5>
        <div className="jur--actions--inner-container">
          <button onClick={createArbitration}>
            1. createArbitration() + Get Contract [arbitration]
          </button>
          <button onClick={() => approveToken(10)}>2 approve() [JURToken]</button>
          <button onClick={signArbitration}>
            3. sign() – pay [arbitration]
          </button>
          <button onClick={approveToken}>4.1 approve() [JURToken] + 1%</button>
          <button>4.2 dispute() [arbitration]</button>
          <button>5. amendDisputeDispersal() – other part [arbitration]</button>
          <button onClick={approveToken}>6.1 approve() [JURToken]</button>
          <button>
            6.2 vote() [arbitration] – see approveAndCall() [JURToken]
          </button>
          <button>
            6.3 vote(0x0) [arbitration] – for reject – see approveAndCall()
            [JURToken]
          </button>
          <button>7. payoutVoter() [arbitration]</button>
          <button>8. payoutParty() [arbitration]</button>
        </div>
      </div>
    </>
  );
};
