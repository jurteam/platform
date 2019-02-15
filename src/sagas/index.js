import { all, fork } from 'redux-saga/effects'
import { drizzleSagas } from 'drizzle'
// import walletSagas from './Wallet'

console.log('drizzleSagas', drizzleSagas);

export default function* rootSaga() {
  yield all(
    drizzleSagas.map(saga => fork(saga))
    // walletSagas,
  )
}