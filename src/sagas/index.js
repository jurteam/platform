import { all, fork } from 'redux-saga/effects'
import { drizzleSagas } from 'drizzle'
import appSagas from './App'
import walletSagas from './Wallet'
import arbitrationSagas from './Arbitration'

// Join all sagas
const sagas = [...drizzleSagas]
sagas.push(appSagas)
sagas.push(walletSagas)
sagas.push(arbitrationSagas)

export default function* rootSaga() {
  yield all(
    sagas.map(saga => fork(saga))
  )
}