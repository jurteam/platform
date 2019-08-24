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
  WITHDRAW_ARBITRATION
} from "../reducers/types";

// Api layouts
import { Contracts, JURToken, Arbitration, ArbitrationFactory } from "../api";

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
  calculateFundingAndDispersal
} from "../utils/helpers"; // log helper

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
          const { statusId, statusLabel, statusUpdatedAt } = response.data.data;
          yield put({
            type: SET_CONTRACT_STATUS,
            statusId,
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
    const { statusId, statusLabel, statusUpdatedAt } = response.data.data;
    yield put({
      type: SET_CONTRACT_STATUS,
      statusId,
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
    const { statusId, statusLabel, statusUpdatedAt } = response.data.data;
    yield put({
      type: SET_CONTRACT_STATUS,
      statusId,
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
    const { statusId, statusLabel, statusUpdatedAt } = response.data.data;
    yield put({
      type: SET_CONTRACT_STATUS,
      statusId,
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
        const { statusId, statusLabel, statusUpdatedAt } = response.data.data;
        yield put({
          type: SET_CONTRACT_STATUS,
          statusId,
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
    } else {
      if (typeof onFail === "function") onFail();
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
  const { id, address: contractAddress, onFail } = args;
  let { amount } = args;

  // single step with approve and call
  const wallet = yield select(getWallet);
  const token = new JURToken();
  const arbitration = new Arbitration(contractAddress);

  // fix amount decimals
  amount = amount * 10**18;

  const signTx = yield token
    .approveAndCall(contractAddress, amount, 'sign', [wallet.address])
    .catch(chainErrorHandler);

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

    try {
      const response = yield call(Contracts.statusChange, toUpdate, id);
      log("handlePayArbitration - contract status updated", response);
      const { statusId, statusLabel, statusUpdatedAt } = response.data.data;
      yield put({
        type: SET_CONTRACT_STATUS,
        statusId,
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
  } else {
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

export function* handleWithdrawArbitration(args) {

  log("handleWithdrawArbitration");
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

      let code = 9; // still waiting for success

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

      try {
        const response = yield call(Contracts.statusChange, toUpdate, id);
        log("handleWithdrawArbitration - contract status updated", response);
        const { statusId, statusLabel, statusUpdatedAt } = response.data.data;
        yield put({
          type: SET_CONTRACT_STATUS,
          statusId,
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
    } else {
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

export function* handleDisputeArbitration({ contractAddress, amount }) {
  const trai = 2;

  if (trai == 1) {
    const wallet = yield select(getWallet);

    let disputeJURFunction = {
      name: "disputeJUR",
      type: "function",
      inputs: [
        {
          type: "address",
          name: "_sender"
        },
        {
          type: "uint256",
          name: "_voteAmount"
        },
        {
          type: "uint256[]",
          name: "_dispersal"
        }
      ]
    };
    amount = parseInt(amount + "000000000000000000");
    const signPayload = [
      wallet.address,
      amount,
      [10000000000000000000, 10000000000000000000]
    ];
    log("signPayload", signPayload);
    const data = global.drizzle.web3.eth.abi.encodeFunctionSignature(
      disputeJURFunction,
      signPayload
    );

    const payload = [contractAddress, amount, data];

    log("upayload", payload);

    const r = yield sendToContract("JURToken", "approveAndCall", payload);
  } else {
    const drizzleContracts = yield select(getDrizzleStoredContracts);
    const contract = drizzleContracts[contractAddress];

    // get contract balance
    const balance = yield callToContract(
      "JURToken",
      "balanceOf",
      [contractAddress],
      () => {},
      () => {}
    );
    const amount = parseInt(balance) * 0.1;
    console.log("amount for dispute", amount, "balance", balance);
    // amount = Number(humanToEth(amount));

    alert("x");

    yield put({
      type: CHAIN_DISPUTE_ARBITRATION,
      contractAddress,
      amount,
      success: () => {
        log("dispute success");
      },
      fail: () => {
        log("dispute fail");
      }
    });

    /*
    const success = () => {
      log('CHAIN_APPROVE_JURTOKEN succedeed');
      global.drizzle.store.dispatch({
        type: CHAIN_DISPUTE_ARBITRATION,
        contractAddress,
        amount,
        success: ()=>{
          log('dispute success');
        },
        fail: ()=>{
          log('dispute fail');
        }
      });
    }

    const fail = () => {
      log('CHAIN_APPROVE_JURTOKEN failed');
    }

    yield put({ type: CHAIN_APPROVE_JURTOKEN,
      contractAddress,
      amount,
      success,
      fail
    });
    */
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

// spawn tasks base certain actions
export default function* arbitrationSagas() {
  log("run", "arbitrationSagas");
  yield takeEvery(SEND_TO_COUNTERPARTY, handleSendToCounterparty);
  yield takeEvery(ACCEPT_ARBITRATION, handleAcceptArbitration);
  yield takeEvery(REJECT_ARBITRATION, handleRejectArbitration);
  yield takeEvery(SUCCESS_ARBITRATION, handleSuccessArbitration);
  yield takeEvery(PAY_ARBITRATION, handlePayArbitration);
  yield takeEvery(DISPUTE_ARBITRATION, handleDisputeArbitration);
  yield takeEvery(WITHDRAW_ARBITRATION, handleWithdrawArbitration);

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
}
