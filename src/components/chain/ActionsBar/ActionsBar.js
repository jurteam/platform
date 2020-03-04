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
  CHAIN_WITHDRAW_DISPERSAL_ARBITRATION,
  DISPUTE_ARBITRATION,
  ACCEPT_ARBITRATION,
  CALC_DISPUTE_ENDS_ARBITRATION,
  TOTAL_VOTES_ARBITRATION,
  DISPUTE_WINDOW_VOTES_ARBITRATION,
  DISPUTE_STARTS_ARBITRATION,
  DISPUTE_ENDS_ARBITRATION,
  SET_MOCKED_NOW,
  GET_NOW
} from "../../../reducers/types";

import { log } from "../../../utils/helpers";

export const ActionsBar = props => {
  const { wallet, contract, isDispute, dispute } = props;
  const { balance } = wallet;

  let currentContractAddress;
  let id;

  if (isDispute) {
    id = dispute.id;
    currentContractAddress = dispute.address;
  } else {
    id = contract.id;
    currentContractAddress = contract.address;
  }

  log("ActionsBar", {currentContractAddress, id});

  const createArbitration = () => {
    log("createArbitration - call");
    global.store.dispatch({
      type: CHAIN_CREATE_ARBITRATION
    });
  };

  const approveToken = (amount) => {
    const contractAddress = currentContractAddress;

    log("approveToken - call on contract", [contractAddress, currentContractAddress]);
    amount = amount * 1000000000000000000; // 18 decimals

    global.store.dispatch({
      type: CHAIN_APPROVE_JURTOKEN,
      contractAddress,
      amount
    });
  };

  const acceptArbitration = (amount) => {
    log('acceptArbitration');
    const contractAddress = currentContractAddress;
    amount = amount * 1000000000000000000; // 18 decimals

    const { dispatch } = global.drizzle.store
    dispatch({
      type: ACCEPT_ARBITRATION,
      contractAddress,
      id,
      amount,
      dispatch
    });
  }

  const rejectArbitration = () => {
    log("rejectArbitration - call");
    const contractAddress = currentContractAddress;
    global.store.dispatch({
      type: REJECT_ARBITRATION,
      address: contractAddress,
      contractAddress,
      id
    });
  };

  const signArbitration = () => {
    log("signArbitration - call");
    global.store.dispatch({
      type: CHAIN_SIGN_ARBITRATION,
      contractAddress: currentContractAddress
    });
  };

  const agreeArbitration = () => {
    log("agreeArbitration - call");

    global.store.dispatch({
      type: CHAIN_AGREE_ARBITRATION,
      contractAddress: currentContractAddress
    });
  };

  const withdrawFromArbitration = () => {
    log("withdrawFromArbitration - call");
    global.store.dispatch({
      type: CHAIN_WITHDRAW_DISPERSAL_ARBITRATION,
      contractAddress: currentContractAddress
    });
  };

  const onDispute = () => {
    log("Dispute - call");
    global.store.dispatch({
      type: DISPUTE_ARBITRATION,
      contractAddress: currentContractAddress
    });
  }

  const disputeArbitration = (amount) => {
    log("approveAndDispute - call");
    global.store.dispatch({
      type: DISPUTE_ARBITRATION,
      contractAddress: currentContractAddress,
      amount: amount
    });
  }

  const calcDisputeEnds = () => {
    log("calcDisputeEnds - call");
    global.store.dispatch({
      type: CALC_DISPUTE_ENDS_ARBITRATION,
      contractAddress: currentContractAddress
    });
  }

  const totalVotes = () => {
    log("calcDisputeEnds - call");
    global.store.dispatch({
      type: TOTAL_VOTES_ARBITRATION,
      contractAddress: currentContractAddress
    });
  }

  const disputeWindowVotes = () => {
    log("calcDisputeEnds - call");
    global.store.dispatch({
      type: DISPUTE_WINDOW_VOTES_ARBITRATION,
      contractAddress: currentContractAddress
    });
  }

  const disputeStarts = () => {
    log("disputeStarts - call");
    global.store.dispatch({
      type: DISPUTE_STARTS_ARBITRATION,
      contractAddress: currentContractAddress
    });
  }
  const disputeEnds = () => {
    log("disputeEnds - call");
    global.store.dispatch({
      type: DISPUTE_ENDS_ARBITRATION,
      contractAddress: currentContractAddress
    });
  }

  const setMockedNow = () => {
    log("setMockedNow - call");
    global.store.dispatch({
      type: SET_MOCKED_NOW,
      contractAddress: currentContractAddress
    });
  }
  const getNow = () => {
    log("getNow - call");
    global.store.dispatch({
      type: GET_NOW,
      contractAddress: currentContractAddress
    });
  }

  return process.env.REACT_APP_DEBUG === "true" ? (
    <>
      <div className="jur--actions--container">
        <h5>Actions Bar – Simple Contract</h5>
        <div className="jur--actions--inner-container">
          <button onClick={createArbitration}>
            1. createArbitration() + Get Contract [arbitration]
          </button>
          <button style={{backgroundColor:'red', color:'white'}} onClick={()=>acceptArbitration(10)}>Accept</button>
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
          <button onClick={()=>approveToken(2)}>4.1 approve() [JURToken] + 1%</button>
          <button onClick={onDispute}>4.2 dispute() [arbitration]</button>
          <button style={{ backgroundColor: 'red', color: 'white' }} onClick={()=>disputeArbitration(2)}>4.2 dispute() [arbitration]</button>
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

      <div className="jur--actions--container">
        <h5>Actions Bar – Helpers</h5>
        <div className="jur--actions--inner-container">
          <button onClick={calcDisputeEnds}>calcDisputeEnds()</button>
          <button onClick={totalVotes}>totalVotes()</button>
          <button onClick={disputeWindowVotes}>disputeWindowVotes()</button>
          <button onClick={disputeStarts}>disputeStarts()</button>
          <button onClick={disputeEnds}>disputeEnds()</button>
          <button onClick={getNow}>getNow()</button>
          <button onClick={setMockedNow}>setMockedNow(+1day)</button>
        </div>
      </div>
    </>
  ) : null;
};
