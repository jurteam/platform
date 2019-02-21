import { put, select, takeEvery } from "redux-saga/effects";
import {
  getAccounts,
  getDrizzleStatus,
  getJURToken,
  getWallet
} from "./Selectors";
import {
  DRIZZLE_INITIALIZED,
  GOT_CONTRACT_VAR,
  NEW_ARBITRATION
} from "../reducers/types";

import { log } from "../utils/helpers"; // log helper

export function* handleNewArbitration(args) {
  log("handleNewArbitration", "run");
  log("handleNewArbitration - args", args);

  const contract = "ArbitrationFactory";
  const method = "createArbitration";

  // destructuring call params
  const { type } = args;

  // cache call on new arbitration request
  if (type === NEW_ARBITRATION) {
    const drizzleStatus = yield select(getDrizzleStatus);
    log("handleNewArbitration - drizzleStatus", drizzleStatus);

    if (drizzleStatus.initialized && global.drizzle) {
      const {
        contracts,
        contracts: { JURToken },
        web3: { utils }
      } = global.drizzle;
      log("handleNewArbitration - contracts", contracts);

      const wallet = yield select(getWallet);

      log(
        "handleNewArbitration - contracts[contract].methods",
        contracts[contract].methods
      );

      // Jur token
      const jurToken = "jurToken";
      log(
        "handleNewArbitration - contracts[contract].methods[jurToken]",
        contracts[contract].methods[jurToken]
      );
      const txJurToken = contracts[contract].methods[jurToken].cacheCall(
        JURToken.address
      );
      log("handleNewArbitration - txJurToken", txJurToken);

      // Read arbitrations
      const arbitrations = "arbirations";
      log(
        "handleNewArbitration - contracts[contract].methods[arbitrations]",
        contracts[contract].methods[arbitrations]
      );
      const txArbitrations = contracts[contract].methods[
        arbitrations
      ].cacheCall(wallet.address);
      log("handleNewArbitration - txArbitrations", txArbitrations);

      // Setup agreement
      const agreement = {
        kpi: "some contract kpi",
        resolutionProof: "resolution proof text"
      };
      const generateHash = "generateHash"; // contract abi method
      const agreementHash = yield contracts[contract].methods[
        generateHash
      ].cacheCall(JSON.stringify(agreement));

      log("handleNewArbitration - agreementHash", agreementHash);

      // createArbitration([party1, party2], [0, 150], [50, 100], "Do some work...")
      const contractPayload = [
        [
          utils.toChecksumAddress(wallet.address),
          utils.toChecksumAddress("0x4d39E9bDE6F596863Cfa2815170134ba7DC75a5C")
        ],
        [0, 150],
        [50, 100],
        agreementHash
      ];

      log("handleNewArbitration - contractPayload", contractPayload);
      log(
        `handleNewArbitration - contracts[contract].methods[${method}]`,
        contracts[contract].methods[method]
      );

      const abi = contracts[contract].abi;

      log("handleNewArbitration - abi", abi);

      // // Fetch initial value from chain and return cache key for reactive updates.
      const tx = yield contracts[contract].methods[method](...contractPayload)
        .call({ from: wallet.address })
        .then((result, second, third) => {
          log("handleNewArbitration - arbitration tx result", result);
          log("handleNewArbitration - arbitration tx second", second);
          log("handleNewArbitration - arbitration tx third", third);
        });

      log("handleNewArbitration - arbitration tx", tx);

      const txArbitrations2 = contracts[contract].methods[
        arbitrations
      ].cacheCall(wallet.address);
      log("handleNewArbitration - txArbitrations", txArbitrations2);

      // // Fetch initial value from chain and return cache key for reactive updates.
      // const dataKey = contracts[contract].methods[arbitrations].cacheCall(
      //   utils.toChecksumAddress(wallet.address)
      // );

      // log("handleNewArbitration - datakey arbitrations", dataKey)

      //     // If hash retrived and set balanche only if there is already a value in store
      //     if (dataKey) {
      //       const JURToken = yield select(getJURToken);

      //       if (JURToken.balanceOf[dataKey]) {
      //         yield put({
      //           type: SET_BALANCE,
      //           amount: JURToken.balanceOf[dataKey].value,
      //           argsHash: dataKey
      //         });
      //       }
      //     }
    }
  }

  // // when contract var is available
  // if (type === GOT_CONTRACT_VAR) {
  //   // destructuring call params
  //   const { name, variable, value, argsHash } = args;
  //   if (name === contract && variable === method) {
  //     // only if

  //     yield put({ type: SET_BALANCE, amount: value, argsHash });
  //   }
  // }
}

// spawn tasks base certain actions
export default function* arbitrationSagas() {
  log("run", "arbitrationSagas");
  yield takeEvery(NEW_ARBITRATION, handleNewArbitration);
}
