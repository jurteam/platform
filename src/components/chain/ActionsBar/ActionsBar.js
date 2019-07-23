/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import Amount from "../../common/Amount";

// Context
import { AppContext } from "../../../bootstrap/AppProvider";

// Style
import "./ActionsBar.scss"; // load scss properly
import { NEW_ARBITRATION } from "../../../reducers/types";

export const ActionsBar = (props) => {

  const { wallet } = props;
  const { balance } = wallet;

  const createArbitration = () => {
    console.log('createArbitration - call');
    global.drizzle.store.dispatch({
      type: NEW_ARBITRATION
    });
  }

  return (
    <>
      <div className="jur--actions--container">
        <h5>Actions Bar – Simple Contract</h5>
        <div className="jur--actions--inner-container">
          <button onClick={createArbitration}>1. createArbitration() + Get Contract [arbitration]</button>
          <button>2.1 approve() [JURToken]</button>
          <button>2.2 reject – approve(0) [JURToken]</button>
          <button>3. sign() – pay [JURToken]</button>
          <button>4.1 agree() [arbitration]</button>
          <button>5. withdrawDispersal() [arbitration]</button>
        </div>
      </div>
      <div className="jur--actions--container">
        <h5>Actions Bar – Dispute Contract</h5>
        <div className="jur--actions--inner-container">
          <button onClick={createArbitration}>1. createArbitration() + Get Contract [arbitration]</button>
          <button>2 approve() [JURToken]</button>
          <button>3. sign() – pay [JURToken]</button>
          <button>4.1 approve() [JURToken] + 1%</button>
          <button>4.2 dispute() [arbitration]</button>
          <button>5. amendDisputeDispersal() – other part [arbitration]</button>
          <button>6.1 approve() [JURToken]</button>
          <button>6.2 vote() [arbitration] – see approveAndCall() [JURToken]</button>
          <button>6.3 vote(0x0) [arbitration] – for reject – see approveAndCall() [JURToken]</button>
          <button>7. payoutVoter() [arbitration]</button>
          <button>8. payoutParty() [arbitration]</button>
        </div>
      </div>
    </>
  );
};
