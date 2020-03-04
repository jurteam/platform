import { put, select, takeEvery } from "redux-saga/effects";
import {
  getAccounts,
  getUser,
  getDrizzleStatus,
  getJURToken,
  getWallet
} from "./Selectors";
import {
  DRIZZLE_INITIALIZED,
  CONNEX_SETWALLETAPI,
  GOT_CONTRACT_VAR,
  SET_BALANCE,
  SET_WALLET_ADDRESS,
  RESET_WALLET,
  LOOKUP_WALLET_BALANCE
} from "../reducers/types";

import JURTokenABI from "../build/contracts/JURToken.json";

import { log, connector, getMethodABI, getJURTokenAddresConnex } from "../utils/helpers"; // log helper
import { callToContract /*, checkDrizzleInit*/ } from "../utils/sc";

// Reset
export function* resetWallet() {
  yield put({ type: RESET_WALLET });
}

// set wallet address from data retrievied via blockchain
export function* setWalletAddress(args) {
  log("setWalletAddress", "run");

  let account = '';
  const connectorValue = connector();

  if (connectorValue === 'web3') 
  {
    const accounts = yield select(getAccounts);
    log("setWalletAddress - accounts", accounts);
    account = accounts[0];
  } 
  else if (connectorValue === 'connex') 
  {
    const {address} = args 
    log("setWalletAddress - address", address);
    account = address;
  }  
  
  const { API } = global;
  log("setWalletAddress - typeof API", typeof API);
  
  if (typeof API !== 'undefined')
  {
    log("setWalletAddress - API");
    API.defaults.headers.common['wallet'] = account.toLowerCase(); // update wallet in REST API request header
    log("setWalletAddress - API.defaults.headers.common['wallet']",API.defaults.headers.common['wallet']);
    yield put({ type: SET_WALLET_ADDRESS, payload: account });
  }
}

export function* handleLookupWalletBalance(args) {

  // // Check if Drizzle is initialized
  // const check = checkDrizzleInit();
  // if (!check) { return false; }

  log("handleLookupWalletBalance", "run");

  const wallet = yield select(getWallet);

  // it will sync automatically token balance using Drizzle fresh data
  const jurTokenBalance = yield callToContract("JURToken", "balanceOf", [wallet.address]);

  if (typeof jurTokenBalance !== 'undefined' && jurTokenBalance) {
    yield put({
      type: SET_BALANCE,
      amount: jurTokenBalance
    })
  }
}

export function* getBalance(args) {
  log("getBalance", "run");
  log("getBalance - args", args);

  const contract = "JURToken";
  const method = "balanceOf";

  // destructuring call params
  const { type, payload } = args;

  // cache call on address set
  if (type === SET_WALLET_ADDRESS) {


    const connectorValue = connector();
    log("getBalance - connector()", connectorValue);

    if (connectorValue === 'web3') {
      const drizzleStatus = yield select(getDrizzleStatus);
      log("getBalance - drizzleStatus", drizzleStatus);

      if (drizzleStatus.initialized && global.drizzle) {
        const { contracts } = global.drizzle;

        const wallet = yield select(getWallet);

        // Fetch initial value from chain and return cache key for reactive updates.
        const dataKey = yield contracts[contract].methods[method].cacheCall(
          wallet.address
        );

        // If hash retrived and set balanche only if there is already a value in store
        if (dataKey) {
          const JURToken = yield select(getJURToken);

          if (JURToken.balanceOf[dataKey]) {
            yield put({
              type: SET_BALANCE,
              amount: JURToken.balanceOf[dataKey].value,
              argsHash: dataKey
            });
          }
        }
      }
    }
    else if (connectorValue === 'connex') 
    {

      // Caching for method balanceOf, for my addresses
      // Solidity function balanceOf(address _owner) public view returns(uint256 balance) 
      // const balanceOfABI = {"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}
      log('getBalance - JURTokenABI',JURTokenABI)
      const balanceOfABI = getMethodABI(JURTokenABI.abi, "balanceOf");
      log('getBalance - balanceOfABI',balanceOfABI)

      // const balanceOfMethod = window.connex.thor.account('0x0000000000000000000000000000456E65726779').method(balanceOfABI)
      // TODO: read properly correct jurtoken contract address

      // getchaintag da drizzle > 3 risposte 
      
      
      log('getBalance - payload',payload)

      const address = payload.toLowerCase();

      const balanceOfMethod = window.connex.thor.account(getJURTokenAddresConnex()).method(balanceOfABI)
      // Set this method to expire when my account being seen
      balanceOfMethod.cache([address])
      // Get balance of my account, we will get cached result on most blocks
      // Event Transfer(_from = '0x7567d83b7b8d80addcb281a71d54fc7b3364ffed', ....) would make cache expired
      
      let userBalance = 0;
      
      yield balanceOfMethod.call(address).then(output=>{
        log('getBalance - balanceOfMethod',output)

        userBalance = output.decoded[0];
        
        log('getBalance - userBalance (then)',userBalance)
      })
      
      log('getBalance - userBalance',userBalance)

      yield put({
        type: SET_BALANCE,
        amount: userBalance,
        argsHash: null
      });
        
      // const acc = window.connex.thor.account('0x7567d83b7b8d80addcb281a71d54fc7b3364ffed')
      // acc.get().then(accInfo=>{
      //     log('getBalance - connex',accInfo);
      // })
      
    }

  }

  // when contract var is available
  if (type === GOT_CONTRACT_VAR) {
    // destructuring call params
    const { name, variable, value, argsHash } = args;
    if (name === contract && variable === method) {
      // only if

      yield put({ type: SET_BALANCE, amount: value, argsHash });
    }
  }
}

// spawn tasks base certain actions
export default function* walletSagas() {
  log("run", "walletSagas");
  yield takeEvery(DRIZZLE_INITIALIZED, setWalletAddress);
  yield takeEvery(CONNEX_SETWALLETAPI, setWalletAddress);
  yield takeEvery(SET_WALLET_ADDRESS, getBalance);
  yield takeEvery(GOT_CONTRACT_VAR, getBalance);
  yield takeEvery(LOOKUP_WALLET_BALANCE, handleLookupWalletBalance);
}
