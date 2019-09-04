import { put, call, select, takeLatest, takeEvery } from "redux-saga/effects";
import {
  getAccounts,
  getDrizzleStatus,
  getCurrentContract,
  getDrizzleStoredContracts,
  getJURToken,
  getWallet
} from "./Selectors";
import {
  DRIZZLE_INITIALIZED,
  GOT_CONTRACT_VAR,
  SET_CONTRACT,
  SET_CONTRACT_STATUS,
  FETCH_CONTRACTS,
  API_CATCH,
  NEW_ARBITRATION,
  PAY_ARBITRATION,
  DISPUTE_ARBITRATION,
  SUCCESS_ARBITRATION,
  ACCEPT_ARBITRATION,
  REJECT_ARBITRATION,
  SEND_TO_COUNTERPARTY,
  EVENT_FIRED,
  SET_BALANCE,
  CONTRACT_INITIALIZED,
  CONTRACT_SAVING,
  CONTRACT_UPDATING,
  CHAIN_GET_CONTRACT,
  ACCEPT_ARBITRATION_AMENDMENT,
  CHAIN_CREATE_ARBITRATION,
  CHAIN_APPROVE_JURTOKEN,
  CHAIN_SIGN_ARBITRATION,
  CHAIN_AGREE_ARBITRATION,
  CHAIN_WITHDRAW_DISPERSAL_ARBITRATION,
  CHAIN_DISPUTE_ARBITRATION,
  CHAIN_VOTE_ARBITRATION,
  LOOKUP_WALLET_BALANCE,
  WITHDRAW_ARBITRATION,
  AMEND_DISPUTE_ARBITRATION,
  CALC_DISPUTE_ENDS_ARBITRATION,
  TOTAL_VOTES_ARBITRATION,
  DISPUTE_WINDOW_VOTES_ARBITRATION,
  DISPUTE_STARTS_ARBITRATION,
  DISPUTE_ENDS_ARBITRATION,
  SET_MOCKED_NOW,
  GET_NOW,
  DISPUTE_SAVING,
  DISPUTE_UPDATING
} from "../reducers/types";

// Api layouts
import { Contracts, Oracles, JURToken, Arbitration, ArbitrationFactory, Disputes } from "../api";

import {
  chainGetContract,
  callToContract,
  sendToContract,
  checkDrizzleInit
} from "../utils/sc";

import {
  log,
  warn,
  humanToEth,
  ethToHuman,
  ethToStore,
  chainErrorHandler,
  formatAmount,
  calculateFundingAndDispersal,
  getContractTotalValue
} from "../utils/helpers"; // log helper
import ArbitrationMock from "../api/ArbitrationMock";

export function* fetchArbitrations(args) {
  log("fetchArbitrations", "run");
  log("fetchArbitrations - args", args);

  const ArbitrationFactory = "ArbitrationFactory";

  const drizzleStatus = yield select(getDrizzleStatus);
  log("fetchArbitrations - drizzleStatus", drizzleStatus);
  if (drizzleStatus.initialized && global.drizzle) {
    const {
      contracts,
      web3,
      web3: { utils }
    } = global.drizzle;
    log("fetchArbitrations - contracts", contracts);

    const wallet = yield select(getWallet);

    log(
      "fetchArbitrations - contracts[ArbitrationFactory].methods",
      contracts[ArbitrationFactory].methods
    );

    // Read arbitrations
    log(
      "fetchArbitrations - contracts[ArbitrationFactory].methods['arbirations']",
      contracts[ArbitrationFactory].methods["arbirations"]
    );
    const txArbitrations = yield contracts[ArbitrationFactory].methods[
      "arbirations"
    ].cacheCall(wallet.address);
    log("fetchArbitrations - txArbitrations", txArbitrations);
  }
}

export function* handleCreateArbitration(args) {
  log("handleCreateArbitration", "run");
  log("handleCreateArbitration - args", args);

  // Check if Drizzle is initialized
  const check = checkDrizzleInit();
  if (!check) {
    return false;
  }

  const {
    web3: { utils }
  } = global.drizzle;

  yield put({ type: CONTRACT_SAVING, payload: true });
  yield put({ type: CONTRACT_UPDATING, payload: true });

  const wallet = yield select(getWallet);

  const contractData = yield select(getCurrentContract);
  const [partA, partB] = contractData.counterparties;

  log("handleCreateArbitration - contractData", contractData);

  // Setup agreement
  const agreement = {
    kpi: contractData.kpi,
    resolutionProof: contractData.resolutionProof
  };

  const factory = new ArbitrationFactory();
  const agreementHash = yield factory.generateHash(JSON.stringify(agreement));

  log("handleCreateArbitration - agreementHash", agreementHash);

  const { id, partAPenaltyFee, partBPenaltyFee, whoPays, value } = contractData;
  const { fundings, dispersal } = calculateFundingAndDispersal(contractData);

  log("handleCreateArbitration - fundings + dispersal", {
    fundings,
    dispersal
  });

  // createArbitration([party1, party2], [0, 150], [50, 100], "Do some work...")
  const contractPayload = [
    [
      utils.toChecksumAddress(partA.wallet),
      utils.toChecksumAddress(partB.wallet)
    ],
    Object.values(dispersal),
    Object.values(fundings),
    agreementHash
  ];

  log("contractPayload", contractPayload);

  let arbitrationAddress = null;

  const tx = yield factory.createArbitration(...contractPayload).catch(chainErrorHandler)

  if (tx) { // only if tx resolved properly
    log("[promise] handleCreateArbitration - arbitration tx result", tx);

    if (process.env.REACT_APP_VECHAIN_ENABLED === "true") {
      // Comet - VeChain Blockchain
      const { receipt } = tx;
      const { address } = receipt.outputs[0].events[0]; // get arbitration address
      log("handleCreateArbitration - arbitration address", address);
      arbitrationAddress = address;
    } else {
      // Metamask - Ethereum Blockchain
      const { receipt } = tx;
      const { _arbitration } = receipt.events.ArbitrationCreated.returnValues; // get arbitration address
      log("handleCreateArbitration - arbitration address", _arbitration);
      arbitrationAddress = _arbitration;
    }

    log("handleCreateArbitration - arbitration tx", tx);
    log("handleCreateArbitration - arbitration address", arbitrationAddress);

    if (arbitrationAddress) {
      // Step .2 - JURToken

      // approve
      /*
      let approveFundings =
        partA.wallet === wallet.address ? fundings.a : fundings.b;
      const approved = yield sendToContract("JURToken", "approve", [
        wallet.address,
        approveFundings
      ]);
      log("handleCreateArbitration - jur Token approved?", approved);
      */

      // Update contract address
      let toUpdate = new FormData();
      // toUpdate.append('_method', 'PUT');
      toUpdate.append("address", arbitrationAddress);
      try {
        let response = yield call(Contracts.update, toUpdate, id);
        log("handleCreateArbitration - contract address updated", response);

        // Status update
        toUpdate = new FormData();
        toUpdate.append("code", 1);
        try {
          response = yield call(Contracts.statusChange, toUpdate, id);
          log("handleCreateArbitration - contract status updated", response);
          const { statusId, statusLabel, statusUpdatedAt, statusFrom } = response.data.data;
          yield put({
            type: SET_CONTRACT_STATUS,
            statusId,
            statusFrom,
            statusLabel,
            statusUpdatedAt,
            id
          });
          yield put({ type: FETCH_CONTRACTS });

          // const { history } = action;
          // history.push(`/contracts/detail/${id}`); // go to contract detail for furter operations
        } catch (error) {
          yield put({ type: API_CATCH, error });
        }

        // const { history } = action;
        // history.push(`/contracts/detail/${id}`); // go to contract detail for furter operations
      } catch (error) {
        yield put({ type: API_CATCH, error });
      }

      yield put({ type: CHAIN_GET_CONTRACT, address: arbitrationAddress });

      // Read arbitrations
      // const txArbitrations = yield callToContract("ArbitrationFactory", "arbirations", [wallet.address]);
      // log("handleCreateArbitration - txArbitrations", txArbitrations);
    }
  }

  yield put({ type: CONTRACT_SAVING, payload: false });
  yield put({ type: CONTRACT_UPDATING, payload: false });
}

export function* handleEvents(args) {
  log("handleEvents", "run");
  log("handleEvents - args", args);

  // destructuring call params
  const { type } = args;

  const drizzleStatus = yield select(getDrizzleStatus);
  log("handleEvents - drizzleStatus", drizzleStatus);
  if (drizzleStatus.initialized && global.drizzle) {
    const {
      contracts,
      web3,
      web3: { utils }
    } = global.drizzle;
    log("handleEvents - contracts", contracts);

    // get event data
    if (type === EVENT_FIRED) {
      const { event } = args;

      log("handleEvents - event", event);
    }
  }
}

function* handleContractInitialized(args) {
  yield log("handleContractInitialized - run", args);
  const { name } = args;

  const drizzleStatus = yield select(getDrizzleStatus);
  log("chainGetContract - drizzleStatus", drizzleStatus);
  if (drizzleStatus.initialized && global.drizzle) {
    const { contracts } = global.drizzle;
    log(`handleContractInitialized - contracts`, contracts);

    const wallet = yield select(getWallet);

    if (name !== "JURToken" && name !== "ArbitrationFactory") {
      const checks = {
        state: [],
        funding: [wallet.address],
        dispersal: [wallet.address],
        parties: [wallet.address],
        hasAgreed: [wallet.address],
        hasSigned: [wallet.address],
        hasWithdrawn: [wallet.address],
        hasFundedAmendment: [wallet.address],
        amendmentProposed: []
      };

      let idx = 1;

      for (const [fn, args] of Object.entries(checks)) {
        const res = contracts[name].methods[fn].cacheCall(...args);
        log(
          `handleContractInitialized - check ${idx}. - contracts[${name}] ${fn}`,
          res
        );

        idx++;
      }

      // const agree = contracts[name].methods["agree"].cacheSend();
      // log(`handleContractInitialized - agree`, agree);
    }
  }
}

export function* handleAcceptArbitrationAmendment(args) {
  log("handleAcceptArbitrationAmendment - run", args);
  const { id, address } = args;

  // Status update
  let toUpdate = new FormData();
  toUpdate.append("code", 29); // closed friendly resolution

  try {
    const response = yield call(Contracts.statusChange, toUpdate, id);
    log("handleAcceptArbitrationAmendment - contract status updated", response);
    const { statusId, statusLabel, statusUpdatedAt, statusFrom } = response.data.data;
    yield put({
      type: SET_CONTRACT_STATUS,
      statusId,
      statusFrom,
      statusLabel,
      statusUpdatedAt,
      id
    });
    yield put({ type: FETCH_CONTRACTS });

    // const { history } = action;
    // history.push(`/contracts/detail/${id}`); // go to contract detail for furter operations
  } catch (error) {
    yield put({ type: API_CATCH, error });
  }
}

export function* handleAcceptArbitration({
  // contractAddress,
  // amount,
  id
}) {

  // off chain only

  // Status update
  let toUpdate = new FormData();
  toUpdate.append("code", 2);

  try {
    const response = yield call(Contracts.statusChange, toUpdate, id);
    const { statusId, statusLabel, statusUpdatedAt, statusFrom } = response.data.data;
    yield put({
      type: SET_CONTRACT_STATUS,
      statusId,
      statusFrom,
      statusLabel,
      statusUpdatedAt,
      id
    });
    yield put({ type: FETCH_CONTRACTS });

    // const { history } = action;
    // history.push(`/contracts/detail/${id}`); // go to contract detail for furter operations
  } catch (error) {
    yield put({ type: API_CATCH, error });
  }
}

export function* handleRejectArbitration({ id, address: contractAddress }) {
  log("handleRejectArbitration - run", { id, contractAddress });

  // Check if Drizzle is initialized
  const check = checkDrizzleInit();
  if (!check) {
    return false;
  }

  if (!contractAddress) {
    return false;
  } // proceed only if exist an arbitration on chain

  const token = new JURToken();
  const arbitration = new Arbitration(contractAddress);

  const hasSigned = yield arbitration.hasSigned().catch(chainErrorHandler);
  log(`handleRejectArbitration - current user has hasSigned?`, hasSigned);

  // contracts["JURToken"].methods["approve"].cacheSend();

  // chain rejection
  let unsignTx = false; // not needed by default
  if (hasSigned)
  {
    // Unsign
    unsignTx = yield arbitration.unsign().catch(chainErrorHandler);
  }
  if (unsignTx === false) { /* do nothing */ } // TODO: instead should prompt user to force unsign

  // Prevent future token sign
  // yield put({ type: CHAIN_APPROVE_JURTOKEN, amount: 0 }); // ???
  let unapproveTx = false
  const hasAllowance = yield token.allowance(contractAddress).catch(chainErrorHandler);
  log(`handleRejectArbitration - current contract has hasAllowance?`, hasAllowance);
  if (hasAllowance && hasAllowance.toString() !== "0")
  {
    // Remove token allowance
    unapproveTx = yield token.approve(contractAddress, 0).catch(chainErrorHandler);
  }
  if (unapproveTx === false) { /* do nothing */ } // TODO: instead should prompt user to force unallowance

  // Status update
  let toUpdate = new FormData();
  toUpdate.append("code", -1);

  try {
    const response = yield call(Contracts.statusChange, toUpdate, id);
    log("handleRejectArbitration - contract status updated", response);
    const { statusId, statusLabel, statusUpdatedAt, statusFrom } = response.data.data;
    yield put({
      type: SET_CONTRACT_STATUS,
      statusId,
      statusFrom,
      statusLabel,
      statusUpdatedAt,
      id
    });
    yield put({ type: FETCH_CONTRACTS });

    // const { history } = action;
    // history.push(`/contracts/detail/${id}`); // go to contract detail for furter operations
  } catch (error) {
    yield put({ type: API_CATCH, error });
  }
}

export function* handleSuccessArbitration(args) {
  yield put({ type: CONTRACT_SAVING, payload: true });
  yield put({ type: CONTRACT_UPDATING, payload: true });
  const { id, address: contractAddress, onFail } = args;

  const arbitration = new Arbitration(contractAddress);

  const hasAgreed = yield arbitration.hasAgreed().catch(chainErrorHandler);
  log(`handleSuccessArbitration - current user has hasAgreed?`, hasAgreed);

  if (!hasAgreed) {

    const agreeTx = yield arbitration.agree().catch(chainErrorHandler);

    if (agreeTx) { // only if there is a valid sign tx

      let code = 7; // still waiting for success

      const allParties = yield arbitration.allParties();
      log("handleSuccessArbitration - allParties", allParties);

      const partyAHasAgreed = yield arbitration.hasAgreed(allParties[0]);
      const partyBHasAgreed = yield arbitration.hasAgreed(allParties[1]);

      const agreed = partyAHasAgreed && partyBHasAgreed; // assuming all party has payed
      if (agreed) {
        code = 9; // closed – ready for withdrawn
      }

      // Status update
      let toUpdate = new FormData();
      toUpdate.append("code", code);

      try {
        const response = yield call(Contracts.statusChange, toUpdate, id);
        log("handleSuccessArbitration - contract status updated", response);
        const { statusId, statusLabel, statusUpdatedAt, statusFrom } = response.data.data;
        yield put({
          type: SET_CONTRACT_STATUS,
          statusId,
          statusFrom,
          statusLabel,
          statusUpdatedAt,
          id
        });
        yield put({ type: FETCH_CONTRACTS });
        yield put({ type: CONTRACT_SAVING, payload: false });
        yield put({ type: CONTRACT_UPDATING, payload: false });

        // const { history } = action;
        // history.push(`/contracts/detail/${id}`); // go to contract detail for furter operations
      } catch (error) {
        yield put({ type: API_CATCH, error });
        yield put({ type: CONTRACT_SAVING, payload: false });
        yield put({ type: CONTRACT_UPDATING, payload: false });
      }
    } else {
      if (typeof onFail === "function") onFail();
      yield put({ type: CONTRACT_SAVING, payload: false });
      yield put({ type: CONTRACT_UPDATING, payload: false });
    }
  }
}

export function* pay(address, amount) {
  const drizzleStatus = yield select(getDrizzleStatus);
  log("pay - drizzleStatus", drizzleStatus);
  if (drizzleStatus.initialized && global.drizzle) {
    const { contracts } = global.drizzle;
    log(`pay - current contract`, contracts[address]);
    log(`pay - global.drizzle`, global.drizzle);
    log(`pay - global.web3`, global.web3);
    // log(`pay - JURToken contract`, contracts["JURToken"]);

    const { web3 } = global.drizzle;

    const wallet = yield select(getWallet);

    const drizzleContracts = yield select(getDrizzleStoredContracts);
    log(`pay - current drizzle contract`, drizzleContracts[address]);

    // const payStatus = yield contracts[address].methods["pay"].cacheSend();
    // log(
    //   `pay - payment status`,
    //   payStatus
    // );
    log(`pay - address isAddress?`, web3.utils.isAddress(address));
    log(
      `pay - wallet.address isAddress?`,
      web3.utils.isAddress(wallet.address)
    );
    log(`pay - amount`, amount);
    log(`pay - payload`, {
      from: wallet.address,
      to: address,
      value: web3.utils.toWei(amount.toString(), "ether")
    });

    yield sendToContract();

    // yield web3.eth.sendSignedTransaction(
    //   {
    //     from: wallet,
    //     to: address,
    //     value: web3.utils.toWei(amount.toString(), "ether")
    //   },
    //   function(error, result) {
    //     if (error) {
    //       log("pay - error", error);
    //       return false;
    //     } else {
    //       log("pay - result", result);
    //       return true;
    //     }
    //   }
    // );

    return false;
  }

  return false;
}

export function* handlePayArbitration(args) {
  log("handlePayArbitration - run", args);

  yield put({ type: CONTRACT_SAVING, payload: true });
  yield put({ type: CONTRACT_UPDATING, payload: true });

  const { id, address: contractAddress, onFail } = args;
  let { amount } = args;

  // single step with approve and call
  const wallet = yield select(getWallet);
  const token = new JURToken();
  const arbitration = new Arbitration(contractAddress);
  log("handlePayArbitration – arbitration", arbitration);

  // string interpolation for activities
  const iValue = amount

  // fix amount decimals
  // amount = amount * 10**18;
  amount = global.drizzle.web3.utils.toWei(amount.toString(), 'ether');

  // // convert amout to string
  // amount = amount.toString();

  const signTx = yield token
    .approveAndCall(contractAddress, amount, 'sign', [wallet.address])
    .catch(chainErrorHandler);

  log("handlePayArbitration – signTx", signTx);

  // Two Step method
  // const tk = new JURToken();
  // yield tk
  //   .balanceOf(contractAddress)
  //   .then(res => { console.log('TEST – balanceOf', res.toString())})

  // // step 1
  // const token = new JURToken();
  // console.log("handleAcceptArbitration - JURToken", token);
  // yield token
  //   .approve(contractAddress, amount)
  //   .then(res => {
  //     console.log("handleAcceptArbitration – step 1 finished", res);

  //     // step 2
  //     const arbitration = new Arbitration(contractAddress);
  //     console.log("handleAcceptArbitration - Arbitration", arbitration);
  //     return arbitration
  //       .sign()
  //       .then(res => console.log("handleAcceptArbitration – accepted", res))
  //       .catch(err =>
  //         console.log("handleAcceptArbitration – step 2 error", err)
  //       );
  //   })
  //   .catch(err => console.log("handleAcceptArbitration – step 1 error", err));

  if (signTx) { // only if there is a valid sign tx

    yield put({ type: LOOKUP_WALLET_BALANCE }); // update wallet balance

    let code = 3; // still waiting for payment

    const allParties = yield arbitration.allParties();
    log("handlePayArbitration - allParties", allParties);

    const partyAHasPayed = yield arbitration.hasSigned(allParties[0]);
    const partyBHasPayed = yield arbitration.hasSigned(allParties[1]);

    const fullfilled = partyAHasPayed && partyBHasPayed; // assuming all party has payed
    if (fullfilled) {
      code = 5; // ongoing
    }

    // Status update
    let toUpdate = new FormData();
    toUpdate.append("code", code);
    toUpdate.append("interpolation[value]", iValue);

    try {
      const response = yield call(Contracts.statusChange, toUpdate, id);
      log("handlePayArbitration - contract status updated", response);
      const { statusId, statusLabel, statusUpdatedAt, statusFrom } = response.data.data;
      yield put({
        type: SET_CONTRACT_STATUS,
        statusId,
        statusFrom,
        statusLabel,
        statusUpdatedAt,
        id
      });
      yield put({ type: FETCH_CONTRACTS });
      yield put({ type: CONTRACT_SAVING, payload: false });
      yield put({ type: CONTRACT_UPDATING, payload: false });

      // const { history } = action;
      // history.push(`/contracts/detail/${id}`); // go to contract detail for furter operations
    } catch (error) {
      yield put({ type: CONTRACT_SAVING, payload: false });
      yield put({ type: CONTRACT_UPDATING, payload: false });
      yield put({ type: API_CATCH, error });
    }
  } else {
    yield put({ type: CONTRACT_SAVING, payload: false });
    yield put({ type: CONTRACT_UPDATING, payload: false });
    if (typeof onFail === "function") onFail();
  }
}

export function* handleSignArbitration({ contractAddress }) {
  log("handleSignArbitration on", contractAddress);

  const success = data => {
    log("handleSignArbitration – success", data);
    global.drizzle.store.dispatch({
      type: LOOKUP_WALLET_BALANCE
    });
  };

  const fail = data => {
    log("handleSignArbitration – fail", data);
  };

  const wallet = yield select(getWallet);
  yield sendToContract(contractAddress, "sign", null, success, fail);
}

export function* handleAmendDisputeArbitration(args) {

  log("handleAmendDisputeArbitration");
  yield put({ type: DISPUTE_SAVING, payload: true });
  yield put({ type: DISPUTE_UPDATING, payload: true });

  const { id, code, message, proposalAttachments, callback } = args;
  let { dispersal } = args;
  const currentContract = yield select(getCurrentContract);
  const { address: contractAddress } = currentContract;

  const arbitration = new Arbitration(contractAddress);

  const proposal_part_a = dispersal[0];
  const proposal_part_b = dispersal[1];

  // fix decimals
  dispersal[0] = dispersal[0] * 10**18;
  dispersal[1] = dispersal[1] * 10**18;

  // fix strings
  dispersal[0] = dispersal[0].toString();
  dispersal[1] = dispersal[1].toString();

  const amendDisputeTx = yield arbitration.amendDisputeDispersal(dispersal).catch(chainErrorHandler);

  if (amendDisputeTx) { // only if there is a valid sign tx

    log("handleAmendDisputeArbitration – amendDisputeTx", amendDisputeTx)

    yield put({ type: LOOKUP_WALLET_BALANCE }); // update wallet balance

    // Status update
    let toUpdate = new FormData();
    toUpdate.append("code", code);
    toUpdate.append("message", message);
    toUpdate.append("proposal_part_a", proposal_part_a);
    toUpdate.append("proposal_part_b", proposal_part_b);

    log("handleAmendDisputeArbitration - proposalAttachments", proposalAttachments);

    if (proposalAttachments.files && proposalAttachments.files.length) {
      for (let i = 0; i < proposalAttachments.files.length; i++) {
        // iteate over any file sent over appending the files to the form data.
        let file = proposalAttachments.files[i];

        log("handleAmendDisputeArbitration - for each file", file);

        toUpdate.append("attachments[" + i + "]", file);
      }
      // toSend.append("attachments[]", proposalAttachments.files);
    }


    try {
      let response = yield call(Disputes.store, toUpdate, id);
      log("handleAmendDisputeArbitration - contract status updated", response);
      // const { statusId, statusLabel, statusUpdatedAt, statusFrom } = response.data.data;
      // yield put({
      //   type: SET_CONTRACT_STATUS,
      //   statusId,
      //   statusFrom,
      //   statusLabel,
      //   statusUpdatedAt,
      //   id
      // });
      yield put({ type: FETCH_CONTRACTS });
      yield put({ type: DISPUTE_SAVING, payload: false });
      yield put({ type: DISPUTE_UPDATING, payload: false });
      if (typeof callback === "function") callback();

      // const { history } = action;
      // history.push(`/contracts/detail/${id}`); // go to contract detail for furter operations
    } catch (error) {
      yield put({ type: API_CATCH, error });
      yield put({ type: DISPUTE_SAVING, payload: false });
      yield put({ type: DISPUTE_UPDATING, payload: false });
    }
  } else {
    yield put({ type: DISPUTE_SAVING, payload: false });
    yield put({ type: DISPUTE_UPDATING, payload: false });
    if (typeof callback === "function") callback();
  }
}

export function* handleWithdrawArbitration(args) {

  log("handleWithdrawArbitration");
  yield put({ type: CONTRACT_SAVING, payload: true });
  yield put({ type: CONTRACT_UPDATING, payload: true });
  const { id, address: contractAddress, onFail } = args;

  const arbitration = new Arbitration(contractAddress);

  const dispersal = yield arbitration.dispersal().catch(chainErrorHandler);
  log(`handleWithdrawArbitration - current user has dispersal?`, dispersal.toString());

  const hasWithdrawn = yield arbitration.hasWithdrawn().catch(chainErrorHandler);
  log(`handleWithdrawArbitration - current user has hasWithdrawn?`, hasWithdrawn);

  if (!hasWithdrawn && dispersal.toString() !== "0") {

    const withdrawTx = yield arbitration.withdrawDispersal().catch(chainErrorHandler);

    if (withdrawTx) { // only if there is a valid sign tx

      yield put({ type: LOOKUP_WALLET_BALANCE }); // update wallet balance

      let code = 10; // still waiting for success

      // NOTICE: this should be the normal behavior, since we have 100% to one party this can work only this way
      // let code = 9; // still waiting for withdrown from one party

      // const allParties = yield arbitration.allParties();
      // log("handleWithdrawArbitration - allParties", allParties);

      // const partyAHasWithdrawn = yield arbitration.hasWithdrawn(allParties[0]);
      // const partyBHasWithdrawn = yield arbitration.hasWithdrawn(allParties[1]);

      // const withdrawn = partyAHasWithdrawn && partyBHasWithdrawn; // assuming all party has payed
      // if (withdrawn) {
      //   code = 10; // closed – ready for withdrawn
      // }

      // Status update
      let toUpdate = new FormData();
      toUpdate.append("code", code);
      toUpdate.append("interpolation[value]", ethToHuman(dispersal.toString()));

      try {
        const response = yield call(Contracts.statusChange, toUpdate, id);
        log("handleWithdrawArbitration - contract status updated", response);
        const { statusId, statusLabel, statusUpdatedAt, statusFrom } = response.data.data;
        yield put({
          type: SET_CONTRACT_STATUS,
          statusId,
          statusFrom,
          statusLabel,
          statusUpdatedAt,
          id
        });
        yield put({ type: FETCH_CONTRACTS });
        yield put({ type: CONTRACT_SAVING, payload: false });
        yield put({ type: CONTRACT_UPDATING, payload: false });

        // const { history } = action;
        // history.push(`/contracts/detail/${id}`); // go to contract detail for furter operations
      } catch (error) {
        yield put({ type: API_CATCH, error });
        yield put({ type: CONTRACT_SAVING, payload: false });
        yield put({ type: CONTRACT_UPDATING, payload: false });
      }
    } else {
      yield put({ type: CONTRACT_SAVING, payload: false });
      yield put({ type: CONTRACT_UPDATING, payload: false });
      if (typeof onFail === "function") onFail();
    }
  }
}

export function* handleAgreeArbitration({ contractAddress }) {
  log("handleAgreeArbitration");
  const wallet = yield select(getWallet);

  const drizzleContracts = yield select(getDrizzleStoredContracts);
  const contract = drizzleContracts[contractAddress];
  log(contract);

  const { synced } = contract;

  const hasAgreedAddress = yield callToContract(
    contractAddress,
    "hasAgreed",
    wallet.address
  );
  const hasAgreed =
    typeof contract.hasAgreedAddress != "undefined"
      ? contract.hasAgreedAddress.value
      : false;

  log(
    "handleAgreeArbitration – hasAgreed",
    hasAgreedAddress,
    hasAgreed,
    synced
  );

  if (synced && !hasAgreed) {
    const success = () => {
      log("handleAgreeArbitration – success");
    };

    const fail = () => {
      log("handleAgreeArbitration – fail");
    };

    yield sendToContract(contractAddress, "agree", null, success, fail);
  } else log("no agree, already agreed");
}

export function* handleWithdrawDispersalArbitration({ contractAddress }) {
  log("handleWithdrawDispersalArbitration");
  const wallet = yield select(getWallet);

  const drizzleContracts = yield select(getDrizzleStoredContracts);
  const contract = drizzleContracts[contractAddress];
  log(contract);

  const { synced } = contract;

  const hasWithdrawnAddress = yield callToContract(
    contractAddress,
    "hasWithdrawn",
    wallet.address
  );
  const hasWithdrawn =
    typeof contract.hasWithdrawnAddress != "undefined"
      ? contract.hasWithdrawnAddress.value
      : false;

  log("handleWithdrawDispersalArbitration – hasWithdrawn", hasWithdrawn);

  if (synced && !hasWithdrawn) {
    const success = () => {
      log("handleWithdrawDispersalArbitration – success");
    };

    const fail = () => {
      log("handleWithdrawDispersalArbitration – fail");
    };

    yield sendToContract(
      contractAddress,
      "withdrawDispersal",
      null,
      success,
      fail
    );
  }
}

export function* handleApproveJurToken({
  contractAddress,
  amount,
  success,
  fail
}) {
  log("handleApproveJurToken");
  // TODO: convert amount with 18 decimals

  amount = formatAmount(amount); // Avoid presicion issues on BN
  log("xxx", [contractAddress, amount]);

  const onSuccess = () => {
    log("handleApproveJurToken – success");
    if (success && typeof success === "function") success();
  };

  const onFail = () => {
    log("handleApproveJurToken – fail");
    if (fail && typeof fail === "function") fail();
  };

  return yield sendToContract(
    "JURToken",
    "approve",
    [contractAddress, amount],
    onSuccess,
    onFail
  );
}

export function* handleSendToCounterparty() {
  yield put({ type: CHAIN_CREATE_ARBITRATION });
  // const wallet = yield select(getWallet);
  // const contractData = yield select(getCurrentContract);
  // const [partA, partB] = contractData.counterparties;
  // const fd = calculateFundingAndDispersal(contractData);
  // let amount = 0;
  // if (wallet.address === partA.address)
  //   amount = fd.fundings.a;
  // else
  //   amount = fd.fundings.b;
  // yield put({ type: CHAIN_APPROVE_JURTOKEN, amount});
}

export function* handleDisputeArbitration(args) {

  yield put({ type: DISPUTE_SAVING, payload: true });
  yield put({ type: DISPUTE_UPDATING, payload: true });

  const { id, statusId, message, proposalAttachments, callback } = args;
  let { code, dispersal } = args;
  log("handleDisputeArbitration – dispersal", dispersal)
  log("handleDisputeArbitration – code", code)

  // single step with approve and call
  const wallet = yield select(getWallet);
  const currentContract = yield select(getCurrentContract);
  const { address: contractAddress } = currentContract;
  const token = new JURToken();
  // const arbitration = new Arbitration(contractAddress);

  // Init first vote payload
  let firstVote = new FormData();
  firstVote.append("oracle_wallet", wallet.address);
  firstVote.append("wallet_part", wallet.address);
  firstVote.append("contract_id", id);
  firstVote.append("message", message);

  const totalContractValue = getContractTotalValue(currentContract); // float value
  log("handleDisputeArbitration – totalContractValue", totalContractValue)
  log("handleDisputeArbitration – totalContractValue.toString()", totalContractValue.toString())
  let amount = 0;

  // amount should be value + 1% only first time – should check the contract status
  if (statusId !== 31 && statusId === 5) { // open dispute and fist one to open a dispute

    amount = totalContractValue * Number(process.env.REACT_APP_OPEN_DISPUTE_FEE);

  } else { // ongoing dispute

    /* do nothing for now */

  }

  log("handleDisputeArbitration – process.env.REACT_APP_OPEN_DISPUTE_FEE", process.env.REACT_APP_OPEN_DISPUTE_FEE)
  log("handleDisputeArbitration – Number(process.env.REACT_APP_OPEN_DISPUTE_FEE)", Number(process.env.REACT_APP_OPEN_DISPUTE_FEE))
  log("handleDisputeArbitration – amount", amount)
  log("handleDisputeArbitration – amount.toString()", amount.toString())

  firstVote.append("amount", amount);
  const proposal_part_a = dispersal[0];
  const proposal_part_b = dispersal[1];

  // fix decimals
  amount = amount * 10**18;
  dispersal[0] = dispersal[0] * 10**18;
  dispersal[1] = dispersal[1] * 10**18;

  // fix strings
  amount = amount.toString();
  dispersal[0] = dispersal[0].toString();
  dispersal[1] = dispersal[1].toString();

  log("handleDisputeArbitration – payload", [wallet.address, amount, dispersal])

  const disputeTx = yield token
    .approveAndCall(contractAddress, amount, 'dispute', [wallet.address, amount, dispersal])
    .catch(chainErrorHandler);

  if (disputeTx) { // only if there is a valid dispute tx
    log("handleDisputeArbitration – disputeTx", disputeTx)

    yield put({ type: LOOKUP_WALLET_BALANCE }); // update wallet balance

    // Status update
    let toUpdate = new FormData();
    toUpdate.append("code", code);
    toUpdate.append("message", message);
    toUpdate.append("proposal_part_a", proposal_part_a);
    toUpdate.append("proposal_part_b", proposal_part_b);

    log("handleDisputeArbitration - proposalAttachments", proposalAttachments);

    if (proposalAttachments.files && proposalAttachments.files.length) {
      for (let i = 0; i < proposalAttachments.files.length; i++) {
        // iteate over any file sent over appending the files to the form data.
        let file = proposalAttachments.files[i];

        log("handleDisputeArbitration - for each file", file);

        toUpdate.append("attachments[" + i + "]", file);
      }
      // toSend.append("attachments[]", proposalAttachments.files);
    }



    try {
      let response = yield call(Disputes.store, toUpdate, id);
      log("handleDisputeArbitration - contract status updated", response);
      const { statusId, statusLabel, statusUpdatedAt, statusFrom } = response.data.data;
      yield put({
        type: SET_CONTRACT_STATUS,
        statusId,
        statusFrom,
        statusLabel,
        statusUpdatedAt,
        id
      });
      yield put({ type: FETCH_CONTRACTS });
      yield put({ type: DISPUTE_SAVING, payload: false });
      yield put({ type: DISPUTE_UPDATING, payload: false });

      firstVote.append("hash", disputeTx.tx);

      // Store first vote due dispute init
      response = yield call(Oracles.store, firstVote);
      log("handleDisputeArbitration - set first vote", response);

      if (typeof callback === "function") callback();

      // const { history } = action;
      // history.push(`/contracts/detail/${id}`); // go to contract detail for furter operations
    } catch (error) {
      yield put({ type: API_CATCH, error });
      yield put({ type: DISPUTE_SAVING, payload: false });
      yield put({ type: DISPUTE_UPDATING, payload: false });
    }
  } else {
    yield put({ type: DISPUTE_SAVING, payload: false });
    yield put({ type: DISPUTE_UPDATING, payload: false });
    if (typeof callback === "function") callback();
  }
}

export function* handleChainDisputeArbitration({
  contractAddress,
  amount,
  success,
  fail
}) {
  log("CHAIN_DISPUTE_ARBITRATION on", contractAddress);
  log("CHAIN_DISPUTE_ARBITRATION", { contractAddress, amount, success, fail });

  const onSuccess = () => {
    log("handleChainDisputeArbitration – success");
    if (success && typeof success === "function") success();
  };

  const onFail = () => {
    log("handleChainDisputeArbitration – fail");
    if (fail && typeof fail === "function") fail();
  };

  return yield sendToContract(
    contractAddress,
    "dispute",
    [amount, [10, 10]],
    onSuccess,
    onFail
  );
}

export function* handleChainVoteArbitration({ contractAddress }) {
  log("CHAIN_VOTE_ARBITRATION");
}

export function* handleCalcDisputeEndsArbitration(args) {
  const { id, contractAddress, onFail } = args;

  const arbitration = new Arbitration(contractAddress);

  const tx = yield arbitration.calcDisputeEnds().catch(chainErrorHandler);
  log(`handleCalcDisputeEndsArbitration – result`, tx);
  log(`handleCalcDisputeEndsArbitration – result.toString()`, tx.toString());
}

export function* handleTotalVotesArbitration(args) {
  const { id, contractAddress, onFail } = args;

  const arbitration = new Arbitration(contractAddress);

  const tx = yield arbitration.totalVotes().catch(chainErrorHandler);
  log(`handleTotalVotesArbitration – result`, tx);
  log(`handleTotalVotesArbitration – result.toString()`, tx.toString());
}

export function* handleDisputeWindowVotesArbitration(args) {
  const { id, contractAddress, onFail } = args;

  const arbitration = new Arbitration(contractAddress);

  const tx = yield arbitration.disputeWindowVotes().catch(chainErrorHandler);
  log(`handleDisputeWindowVotesArbitration – result`, tx);
  log(`handleDisputeWindowVotesArbitration – result.toString()`, tx.toString());
}

export function* handleDisputeStartsArbitration(args) {
  const { id, contractAddress, onFail } = args;

  const arbitration = new Arbitration(contractAddress);

  const tx = yield arbitration.disputeStarts().catch(chainErrorHandler);
  log(`handleDisputeStartsArbitration – result`, tx);
  log(`handleDisputeStartsArbitration – result.toString()`, tx.toString());
}

export function* handleDisputeEndsArbitration(args) {
  const { id, contractAddress, onFail } = args;

  const arbitration = new Arbitration(contractAddress);

  const tx = yield arbitration.disputeEnds().catch(chainErrorHandler);
  log(`handleDisputeEndsArbitration – result`, tx);
  log(`handleDisputeEndsArbitration – result.toString()`, tx.toString());
}

export function* handleSetMockedNow(args) {
  const { id, contractAddress, onFail } = args;

  const arbitration = new ArbitrationMock(contractAddress);

  const tomorrow = 1 * 24 * 60 * 60; // +1 day

  const tx = yield arbitration.setMockedNow(tomorrow).catch(chainErrorHandler);
  log(`handleSetMockedNow – result`, tx);
}

export function* handleGetNow(args) {
  const { id, contractAddress, onFail } = args;

  const arbitration = new ArbitrationMock(contractAddress);

  const tx = yield arbitration.getNow().catch(chainErrorHandler);
  log(`handleGetNow – result`, tx);
}

// spawn tasks base certain actions
export default function* arbitrationSagas() {
  log("run", "arbitrationSagas");
  yield takeEvery(SEND_TO_COUNTERPARTY, handleSendToCounterparty);
  yield takeEvery(ACCEPT_ARBITRATION, handleAcceptArbitration);
  yield takeEvery(REJECT_ARBITRATION, handleRejectArbitration);
  yield takeEvery(SUCCESS_ARBITRATION, handleSuccessArbitration);
  yield takeEvery(PAY_ARBITRATION, handlePayArbitration);
  yield takeEvery(DISPUTE_ARBITRATION, handleDisputeArbitration);
  yield takeEvery(AMEND_DISPUTE_ARBITRATION, handleAmendDisputeArbitration);
  yield takeEvery(WITHDRAW_ARBITRATION, handleWithdrawArbitration);

  yield takeEvery(CALC_DISPUTE_ENDS_ARBITRATION, handleCalcDisputeEndsArbitration);
  yield takeEvery(TOTAL_VOTES_ARBITRATION, handleTotalVotesArbitration);
  yield takeEvery(DISPUTE_WINDOW_VOTES_ARBITRATION, handleDisputeWindowVotesArbitration);
  yield takeEvery(DISPUTE_STARTS_ARBITRATION, handleDisputeStartsArbitration);
  yield takeEvery(DISPUTE_ENDS_ARBITRATION, handleDisputeEndsArbitration);

  yield takeEvery(CHAIN_CREATE_ARBITRATION, handleCreateArbitration);
  yield takeEvery(CHAIN_APPROVE_JURTOKEN, handleApproveJurToken);
  yield takeEvery(CHAIN_SIGN_ARBITRATION, handleSignArbitration);
  yield takeEvery(CHAIN_AGREE_ARBITRATION, handleAgreeArbitration);
  yield takeEvery(
    CHAIN_WITHDRAW_DISPERSAL_ARBITRATION,
    handleWithdrawDispersalArbitration
  );
  yield takeEvery(CHAIN_DISPUTE_ARBITRATION, handleChainDisputeArbitration);
  yield takeEvery(CHAIN_VOTE_ARBITRATION, handleChainVoteArbitration);

  yield takeEvery(
    ACCEPT_ARBITRATION_AMENDMENT,
    handleAcceptArbitrationAmendment
  );
  // yield takeEvery(ACCEPT_ARBITRATION, handleAcceptArbitration);
  // yield takeEvery(REJECT_ARBITRATION, handleRejectArbitration);
  // yield takeEvery(SUCCESS_ARBITRATION, handleSuccessArbitration);
  // yield takeEvery(PAY_ARBITRATION, handlePayArbitration);
  yield takeEvery(EVENT_FIRED, handleEvents);
  yield takeEvery(SET_BALANCE, fetchArbitrations);
  yield takeEvery(CHAIN_GET_CONTRACT, chainGetContract);
  yield takeEvery(CONTRACT_INITIALIZED, handleContractInitialized);

  yield takeEvery(GET_NOW, handleGetNow);
  yield takeEvery(SET_MOCKED_NOW, handleSetMockedNow);
}
