import { all, fork } from "redux-saga/effects";
import { drizzleSagas } from "drizzle";
import appSagas from "./App";
import errorsSagas from "./Errors";
import walletSagas from "./Wallet";
import userSagas from "./User";
import contractSagas from "./Contract";
import disputeSagas from "./Dispute";
import oracleSagas from "./Oracles";
import mediaSagas from "./Media";
import arbitrationSagas from "./Arbitration";
import transactionSagas from "./Transaction";
import oathKeeperSagas from "./OathKeeper";
import advocateSagas from "./Advocate";
import houndSagas from "./Hound";

// Join all sagas
const sagas = [...drizzleSagas];
sagas.push(oathKeeperSagas);
sagas.push(advocateSagas);
sagas.push(houndSagas);
sagas.push(appSagas);
sagas.push(errorsSagas);
sagas.push(userSagas);
sagas.push(walletSagas);
sagas.push(mediaSagas);
sagas.push(contractSagas);
sagas.push(disputeSagas);
sagas.push(oracleSagas);
sagas.push(arbitrationSagas);
sagas.push(transactionSagas);

export default function* rootSaga() {
  yield all(sagas.map(saga => fork(saga)));
}
