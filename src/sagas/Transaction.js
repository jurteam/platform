import { put, call, select, takeEvery } from "redux-saga/effects";

import { 
  CATCH_EVENTS,
  FETCH_TRANSACTIONS,
  ADD_TRANSACTION,
  TRANSACTION_ADDED,
  UPDATE_TRANSACTION,
  TRANSACTION_UPDATED,
  SET_CONTRACT_STATUS,
  FETCH_CONTRACTS,
  CONTRACT_SAVING,
  CONTRACT_UPDATING,
  API_CATCH,
  RESOLVE_TX,
  TRANSACTIONS_FETCHED,
} from "../reducers/types";

import { getTransactionsList, getTransactionsLastBlock, getWallet } from './Selectors'

import { log } from "../utils/helpers";

import { 
  Contracts,
  Transactions, 
  connexArbitrationFactory,
  connexArbitrationContract
 } from "../api";


export function* handleFetchTransactions(args) 
{
  const response = yield call(Transactions.list);

  log('handleFetchTransactions - response',response);
  
  yield put({ type: TRANSACTIONS_FETCHED, payload: response.data });

  log('handleFetchTransactions - TRANSACTIONS_FETCHED');
  
  const txWaiting = yield select(getTransactionsList);

  log('handleFetchTransactions - txWaiting',txWaiting);

  yield put({ type: CATCH_EVENTS });

  log('handleFetchTransactions - CATCH_EVENTS');

}

export function* handleAddTransaction(args) 
{
  const { txid, event, param, contract_id } = args
  const response = yield call(Transactions.create, { txid: txid, event: event, param: JSON.stringify(param), contract_id: contract_id });

  log('handleAddTransaction - response',response);
  
  
  
  const txWaiting = yield select(getTransactionsList);
  log('handleAddTransaction - txWaiting',txWaiting);
  
  yield put({ type: TRANSACTION_ADDED, payload: response.data });
  
  const txWaiting2 = yield select(getTransactionsList);
  log('handleAddTransaction - txWaiting2',txWaiting2);
  
}


export function* handleUpdateTransaction(args) 
{

  const { id, block ,time } = args
  
  const response = yield call(Transactions.update, { block: block, time: time },id);

  log('handleUpdateTransaction - response',response);


  yield put({ type: TRANSACTION_UPDATED, payload: response.data });

  log('handleUpdateTransaction - args',args)
  
}


export function* handleCatchEvents(args) {
  
  
  let { block } = args
  
  if (!block) {
    block = global.connex.thor.status.head
  }
  
  log('handleCatchEvents - block',block)
  log('handleCatchEvents - block n°'+block.number+' - ('+new Date(block.timestamp*1000)+') ')
  
  const lastblock = block.number
  log('handleCatchEvents - lastblock',lastblock)
  
  const state = yield select(getWallet);
  const txWaiting = yield select(getTransactionsList);
  const lastblockresolved = yield select(getTransactionsLastBlock);
  
  const lastblockresolvedInt = parseInt(lastblockresolved)
  
  log('handleCatchEvents - state',state)
  log('handleCatchEvents - txWaiting',txWaiting)
  log('handleCatchEvents - lastblockresolved',lastblockresolved)
  
  
  for (let i = lastblockresolvedInt; i <= lastblock; i++) 
  {
    const thisBlock = yield getblockBynumber(i);
    const blockTxs = thisBlock.transactions
    
    log('handleCatchEvents - thisBlock',thisBlock)
    log('handleCatchEvents - blockTxs',blockTxs)
    
    for (let j = 0; j < blockTxs.length; j++) {
      
      const tx = blockTxs[j]
      log('handleCatchEvents - tx',tx)

      for (let k = 0; k < txWaiting.length; k++) {

        const txw = txWaiting[k]
        log('handleCatchEvents - txw',txw)
            
        if (tx === txw.txid)
        {
          log('handleCatchEvents - (tx === txw.txid)')
          // transaction writed into blockchain  
          // getEventUpdateTx(txw, i, thisBlock.timestamp) 
          yield put({type:RESOLVE_TX, txw:txw, blockNumber:i, timestamp:thisBlock.timestamp})

        }
      }
    }

    // yield blockTxs.forEach(tx=>{
      
    //   log('handleCatchEvents - tx',tx)
      
    //   txWaiting.forEach(txw=>{

    //     log('handleCatchEvents - txw',txw)
        
    //     if (tx === txw.txid)
    //     {
    //       log('handleCatchEvents - (tx === txw.txid)')
    //       // transaction writed into blockchain  
    //       getEventUpdateTx(txw, i, thisBlock.timestamp) 

    //     }
    //   })
    // });

  }

}

async function getblockBynumber(i) 
{
  return await global.connex.thor.block(i).get();
}

export function* getEventUpdateTx(args) 
{
  const { txw, blockNumber, timestamp } = args

  log('getEventUpdateTx - txw',txw)
  log('getEventUpdateTx - txw.param',txw.param)
  const param = JSON.parse(txw.param)
  log('getEventUpdateTx - param',param)

  log('getEventUpdateTx - blockNumber',blockNumber)
  log('getEventUpdateTx - timestamp',timestamp)

  let eventDecoded        
  // call event
  if (txw.event === 'ArbitrationCreated') 
  {
    const factory = new connexArbitrationFactory();
    eventDecoded = yield factory.EventCatch(param, txw.event, blockNumber, txw.txid);
  } 
  else 
  {
    const contract = new connexArbitrationContract();
    eventDecoded = yield contract.EventCatch(param, txw.event, blockNumber, txw.txid);
  }
  log('getEventUpdateTx - eventDecoded',eventDecoded)

  // manage event
  yield manageEvent(txw.event, txw.contract_id, eventDecoded)

  // update tx
  yield put({type:UPDATE_TRANSACTION, id: txw.id , block: blockNumber ,time: timestamp })
}

function* manageEvent(event,contractId,decoded) 
{
  log('manageEvent - event',event)
  log('manageEvent - decoded',decoded)
  
  switch (event) 
  {
    case "ArbitrationCreated":
      
      const arbitrationAddress = decoded._arbitration

      log('manageEvent - arbitrationAddress',arbitrationAddress)

      // ============== dispatch event contract created ----------------------


            if (arbitrationAddress) {
              log('handleCreateArbitration - arbitrationAddress ok')
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
                let response = yield call(Contracts.update, toUpdate, contractId);
                log("handleCreateArbitration - contract address updated", response);
          
                // Status update
                toUpdate = new FormData();
                toUpdate.append("code", 1);
                try {
                  response = yield call(Contracts.statusChange, toUpdate, contractId);
                  log("handleCreateArbitration - contract status updated", response);
                  const { statusId, statusLabel, statusUpdatedAt, statusFrom } = response.data.data;
                  yield put({
                    type: SET_CONTRACT_STATUS,
                    statusId,
                    statusFrom,
                    statusLabel,
                    statusUpdatedAt,
                    contractId
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
          
              
              // Read arbitrations
              // const txArbitrations = yield callToContract("ArbitrationFactory", "arbirations", [wallet.address]);
              // log("handleCreateArbitration - txArbitrations", txArbitrations);
            }
          
            yield put({ type: CONTRACT_SAVING, payload: false });
            yield put({ type: CONTRACT_UPDATING, payload: false });
                  


      // -----------------------------------------------------

      break;

    default:
      break;
  }

  return null

}



// spawn tasks base certain actions
export default function* transactionSagas() {
  log("run", "transactionSagas");

  yield takeEvery(FETCH_TRANSACTIONS, handleFetchTransactions);
  yield takeEvery(CATCH_EVENTS, handleCatchEvents);
  yield takeEvery(RESOLVE_TX, getEventUpdateTx);

  yield takeEvery(ADD_TRANSACTION, handleAddTransaction);
  yield takeEvery(UPDATE_TRANSACTION, handleUpdateTransaction);
}