import { all, fork } from 'redux-saga/effects'
import { drizzleSagas } from 'drizzle'
import walletSagas from './Wallet'

// Join all sagas
const sagas = [...drizzleSagas]
sagas.push(walletSagas)

console.log('sagas', sagas);

export default function* rootSaga() {
  yield all(
    sagas.map(saga => fork(saga))
  )
}