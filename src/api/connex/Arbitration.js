

import ArbitrationContractABI from "../../build/contracts/Arbitration.json";

import { log } from "../../utils/helpers";

import { 
  ADD_TRANSACTION,
} from "../../reducers/types";

export default class connexArbitrationContract
{
  constructor(address) 
  {
    this.contract = ArbitrationContractABI;
    this.thorAccount = global.connex.thor.account(address)
    // this.thorAccount = global.connex.thor.account(this.getArbitrationContractAddres())
  }

  async EventCatch(param,event,blockNum,txid)
  {
    const eventABI = this.getMethodABI(event);
    const eventMethod = this.thorAccount.event(eventABI)

    const filter = eventMethod.filter([param])

    filter.order('desc')

    filter.range({
      unit: 'block',
      from: blockNum,
      to: blockNum
    })

    const events = await filter.apply(0, 1)

    if (events) 
    {
      const lastEvent = events[0]
      if (lastEvent) 
      {
        log('EventCatch - lastEvent',lastEvent)
        log('EventCatch - txid',txid)
        log('EventCatch - lastEvent.meta.txid',lastEvent.meta.txID)
        if (lastEvent.meta.txID === txid) 
        {
          return lastEvent.decoded
          // return lastEvent.decoded[1]
        }
      }
    }
    return null

  }

  async allParties(key) 
  {

    log('allParties - ArbitrationFactoryABI',this.contract)
    const allPartiesABI = this.getMethodABI("allParties");
    log('allParties - allPartiesABI',allPartiesABI)
    

    const allPartiesMethod = this.thorAccount.method(allPartiesABI)


    if (typeof key === 'undefined' || !key) { // return all parties
      const partyA = await allPartiesMethod.call(0);  // 0 = a / first party
      const partyB = await allPartiesMethod.call(1);  // 1 = b
      return [ partyA.decoded[0], partyB.decoded[0] ];
    } else { // single party based on key
      const party = await allPartiesMethod.call(key);  // 1 = b
      return party.decoded[0]
    }


  }

  async disputeStarts() 
  {

    log('disputeStarts - ArbitrationFactoryABI',this.contract)
    const disputeStartsABI = this.getMethodABI("disputeStarts");
    log('disputeStarts - disputeStartsABI',disputeStartsABI)
    
    
    const disputeStartsMethod = this.thorAccount.method(disputeStartsABI)
    
    
    const disputeStarts = await disputeStartsMethod.call(); 
    
    log('disputeStarts - disputeStarts',disputeStarts)

    return disputeStarts.decoded[0]

  }

  async disputeEnds() 
  {

    log('disputeEnds - ArbitrationFactoryABI',this.contract)
    const disputeEndsABI = this.getMethodABI("disputeEnds");
    log('disputeEnds - disputeEndsABI',disputeEndsABI)
    
    
    const disputeEndsMethod = this.thorAccount.method(disputeEndsABI)
    
    
    const disputeEnds = await disputeEndsMethod.call(); 
    
    log('disputeEnds - disputeEnds',disputeEnds)

    return disputeEnds.decoded[0]

  }

  async hasSigned(party) 
  {

    log('hasSigned - ArbitrationFactoryABI',this.contract)
    const hasSignedABI = this.getMethodABI("hasSigned");
    log('hasSigned - hasSignedABI',hasSignedABI)
    
    const hasSignedMethod = this.thorAccount.method(hasSignedABI)

    let hash = '';
    
    await hasSignedMethod.call(party).then(output=>{
      log('hasSigned - hasSignedMethod',output)
      log('hasSigned - hasSignedMethod',output.data)

      hash = output.decoded[0];
      
    })

    return hash;

  }

  async hasAgreed(party) 
  {
    log('hasAgreed - ArbitrationFactoryABI',party)
    const hasAgreedABI = this.getMethodABI("hasAgreed");
    log('hasAgreed - hasAgreedABI',hasAgreedABI)
    
    const hasAgreedMethod = this.thorAccount.method(hasAgreedABI)

    let hash = '';
    
    await hasAgreedMethod.call(party).then(output=>{
      log('hasAgreed - hasAgreedMethod',output)

      hash = output.decoded[0];
      
    }).catch(err=>{  
      log('hasAgreed - catch() err',err)
    })

    return hash;

  }

  async hasWithdrawn(party) 
  {
    log('hasWithdrawn - ArbitrationFactoryABI',party)
    const hasWithdrawnABI = this.getMethodABI("hasWithdrawn");
    log('hasWithdrawn - hasWithdrawnABI',hasWithdrawnABI)
    
    const hasWithdrawnMethod = this.thorAccount.method(hasWithdrawnABI)

    let hash = '';
    
    await hasWithdrawnMethod.call(party).then(output=>{
      log('hasWithdrawn - hasWithdrawnMethod',output)

      hash = output.decoded[0];
      
    }).catch(err=>{  
      log('hasWithdrawn - catch() err',err)
    })

    return hash;

  }

  async dispersal(party) 
  {
    log('dispersal - ArbitrationFactoryABI',party)
    const dispersalABI = this.getMethodABI("dispersal");
    log('dispersal - dispersalABI',dispersalABI)
    
    const dispersalMethod = this.thorAccount.method(dispersalABI)

    let hash = '';
    
    await dispersalMethod.call(party).then(output=>{
      log('dispersal - dispersalMethod',output)

      hash = output.decoded[0];
      
    }).catch(err=>{  
      log('dispersal - catch() err',err)
    })

    return hash;

  }

  async agree(account, contractId) 
  {
    
    const agreeABI = this.getMethodABI("agree");

    log('agree - agreeABI',agreeABI)    

    const agreeMethod = this.thorAccount.method(agreeABI)

    log('agree - agreeMethod',agreeMethod)
    

    // --##################--- asClause

    log('agree - parameter',{account})

    const agreeClause = agreeMethod.asClause()
    
    log('agree - agreeClause',agreeClause) 
    
    const signingService = global.connex.vendor.sign('tx')
    
    log('agree - signingService',signingService)


    signingService
    .signer(account) // Enforce signer
    .gas(global.connex.thor.genesis.gasLimit) // Set maximum gas
    .link('http://localhost:3000/contracts/detail/'+contractId) // User will be back to the app by the url https://connex.vecha.in/0xffff....
    .comment('agree contract')

    let txid = null

    await signingService.request([
      {
        ...agreeClause,
      }
    ])
    .then(async (tx)=>{

      log('agree - signingService then()',tx)

      // call transaction saving endpoint
      // ADD_TRANSACTION
      
      txid = tx.txid

      const filter = {
        _party1: account,
      }
      
      global.dispatcher({type: ADD_TRANSACTION,txid: tx.txid, event: 'ContractAgreed', param: filter, contract_id: contractId})
      

      log('agree - signingService then() txid',txid)
      
    }).catch(err=>{  
      log('agree - signingService catch() err',err)
    })


  }

  async withdrawDispersal(account, contractId) 
  {
    
    const withdrawDispersalABI = this.getMethodABI("withdrawDispersal");

    log('withdrawDispersal - withdrawDispersalABI',withdrawDispersalABI)    

    const withdrawDispersalMethod = this.thorAccount.method(withdrawDispersalABI)

    log('withdrawDispersal - withdrawDispersalMethod',withdrawDispersalMethod)
    

    // --##################--- asClause

    log('withdrawDispersal - parameter',{account})

    const withdrawDispersalClause = withdrawDispersalMethod.asClause()
    
    log('withdrawDispersal - withdrawDispersalClause',withdrawDispersalClause) 
    
    const signingService = global.connex.vendor.sign('tx')
    
    log('withdrawDispersal - signingService',signingService)


    signingService
    .signer(account) // Enforce signer
    .gas(global.connex.thor.genesis.gasLimit) // Set maximum gas
    .link('http://localhost:3000/contracts/detail/'+contractId) // User will be back to the app by the url https://connex.vecha.in/0xffff....
    .comment('withdrawDispersal contract')

    let txid = null

    await signingService.request([
      {
        ...withdrawDispersalClause,
      }
    ])
    .then(async (tx)=>{

      log('withdrawDispersal - signingService then()',tx)

      // call transaction saving endpoint
      // ADD_TRANSACTION
      
      txid = tx.txid

      const filter = {
        _party: account,
      }
      
      global.dispatcher({type: ADD_TRANSACTION,txid: tx.txid, event: 'ContractWithdrawn', param: filter, contract_id: contractId})
      

      log('withdrawDispersal - signingService then() txid',txid)
      
    }).catch(err=>{  
      log('agree - signingService catch() err',err)
    })


  }

  async amendDisputeDispersal(dispersal, account, contractId) 
  {
    
    const amendDisputeDispersalABI = this.getMethodABI("amendDisputeDispersal");

    log('amendDisputeDispersal - amendDisputeDispersalABI',amendDisputeDispersalABI)    

    const amendDisputeDispersalMethod = this.thorAccount.method(amendDisputeDispersalABI)

    log('amendDisputeDispersal - amendDisputeDispersalMethod',amendDisputeDispersalMethod)
    

    // --##################--- asClause

    log('amendDisputeDispersal - parameter',{account})

    const amendDisputeDispersalClause = amendDisputeDispersalMethod.asClause(dispersal)
    
    log('amendDisputeDispersal - amendDisputeDispersalClause',amendDisputeDispersalClause) 
    
    const signingService = global.connex.vendor.sign('tx')
    
    log('amendDisputeDispersal - signingService',signingService)


    signingService
    .signer(account) // Enforce signer
    .gas(global.connex.thor.genesis.gasLimit) // Set maximum gas
    .link('http://localhost:3000/contracts/detail/'+contractId) // User will be back to the app by the url https://connex.vecha.in/0xffff....
    .comment('amendDisputeDispersal contract')

    let txid = null

    await signingService.request([
      {
        ...amendDisputeDispersalClause,
      }
    ])
    .then(async (tx)=>{

      log('amendDisputeDispersal - signingService then()',tx)

      // call transaction saving endpoint
      // ADD_TRANSACTION
      
      txid = tx.txid

      const filter = {
        _party: account,
      }
      
      global.dispatcher({type: ADD_TRANSACTION,txid: tx.txid, event: 'ContractDisputeDispersalAmended', param: filter, contract_id: contractId})
      

      log('amendDisputeDispersal - signingService then() txid',txid)
      
    }).catch(err=>{  
      log('agree - signingService catch() err',err)
    })


  }



  getMethodABI(method) 
  {

    let methABI = null
    this.contract.abi.forEach(meth => {    
  
      if (meth.name === method) {
        methABI = meth; 
      }
    });
  
    return methABI;
  
  }  

}