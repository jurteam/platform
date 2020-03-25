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
  LOOKUP_WALLET_BALANCE,
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
  
  yield put({ type: TRANSACTION_ADDED, payload: response.data });

  yield put({ type: CATCH_EVENTS });
  
  
}


export function* handleUpdateTransaction(args) 
{
  log('handleUpdateTransaction - args',args);

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
        
        if (txw !== null) 
        {
          if (tx === txw.txid)
          {
            log('handleCatchEvents - (tx === txw.txid)')
            // transaction writed into blockchain  
            // getEventUpdateTx(txw, i, thisBlock.timestamp) 
            yield put({type:RESOLVE_TX, txw:txw, blockNumber:i, timestamp:thisBlock.timestamp})
  
          }
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
    const contract = new connexArbitrationContract(txw.contract.address);
    eventDecoded = yield contract.EventCatch(param, txw.event, blockNumber, txw.txid);
  }
  log('getEventUpdateTx - eventDecoded',eventDecoded)

  // manage event
  yield manageEvent(txw, eventDecoded)

  // update tx
  yield put({type:UPDATE_TRANSACTION, id: txw.id , block: blockNumber ,time: timestamp })
}

function* manageEvent(txw,decoded) 
{
  const { event, contract: { id } } = txw
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
          
              
              // Read arbitrations
              // const txArbitrations = yield callToContract("ArbitrationFactory", "arbirations", [wallet.address]);
              // log("handleCreateArbitration - txArbitrations", txArbitrations);
            }
          
            yield put({ type: CONTRACT_SAVING, payload: false });
            yield put({ type: CONTRACT_UPDATING, payload: false });
                  


      // -----------------------------------------------------

      break;

    case "ContractSigned":
      
      const party = decoded._party

      log('manageEvent - party',party)

      // ============== dispatch event contract signed ----------------------


              const { contract: { address, value, counterparties, part_a_penalty_fee, part_b_penalty_fee, who_pays } } = txw

              let amount = 0;
              const wallet = yield select(getWallet);
              const partAPenaltyFee = part_a_penalty_fee
              const partBPenaltyFee = part_b_penalty_fee
              const whoPays = who_pays

              if (wallet.address.toLowerCase() === counterparties[1].wallet.toLowerCase()) { // is part b
          
                if (typeof partBPenaltyFee !== 'undefined' && partBPenaltyFee) amount = amount + Number(partBPenaltyFee)
                if (whoPays.toLowerCase() === counterparties[1].wallet.toLowerCase()) {
                  amount = amount + Number(value);
                }
          
              } else {
          
                if (typeof partAPenaltyFee !== 'undefined' && partAPenaltyFee) amount = amount + Number(partAPenaltyFee)
                if (whoPays.toLowerCase() === counterparties[0].wallet.toLowerCase()) {
                  amount = amount + Number(value);
                }
          
              }
          
              let totalValue = Number(value) + Number(partAPenaltyFee) + Number(partBPenaltyFee);
              if (typeof partAPenaltyFee !== 'undefined' && partAPenaltyFee) totalValue = totalValue + Number(partAPenaltyFee);
              if (typeof partBPenaltyFee !== 'undefined' && partBPenaltyFee) totalValue = totalValue + Number(partBPenaltyFee);
  




              yield put({ type: LOOKUP_WALLET_BALANCE }); // update wallet balance
              // TODO: check for wallet balance on connex
                    
              let code = 3; // still waiting for payment


              const arbitration = new connexArbitrationContract(address);
              
              const allParties = yield arbitration.allParties();
              log("manageEvent (ContractSigned) - allParties", allParties);
              
              const partyAHasPayed = yield arbitration.hasSigned(allParties[0]);
              const partyBHasPayed = yield arbitration.hasSigned(allParties[1]);
              
              log("manageEvent (ContractSigned) - partyAHasPayed", partyAHasPayed);
              log("manageEvent (ContractSigned) - partyBHasPayed", partyBHasPayed);

              const fullfilled = partyAHasPayed && partyBHasPayed; // assuming all party has payed
              if (fullfilled) {
                code = 5; // ongoing
              }

              // Status update
              let toUpdate = new FormData();
              toUpdate.append("code", code);
              toUpdate.append("interpolation[value]", amount);
              toUpdate.append("interpolation[contract_value]", totalValue);

              try {
                const response = yield call(Contracts.statusChange, toUpdate, id);
                log("manageEvent (ContractSigned) - contract status updated", response);
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