import { all, fork } from 'redux-saga/effects'
import { drizzleSagas } from 'drizzle'
import appSagas from './App'
import errorsSagas from './Errors'
import walletSagas from './Wallet'
import userSagas from './User'
import arbitrationSagas from './Arbitration'

// Join all sagas
const sagas = [...drizzleSagas]
sagas.push(appSagas)
sagas.push(errorsSagas)
sagas.push(userSagas)
sagas.push(walletSagas)
sagas.push(arbitrationSagas)

export default function* rootSaga() {
  yield all(
    sagas.map(saga => fork(saga))
  )
}