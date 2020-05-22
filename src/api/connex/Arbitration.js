

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

    log('EventCatch ------')

    const eventABI = this.getMethodABI(event);
    const eventMethod = this.thorAccount.event(eventABI)
    
    let filter 

    log('EventCatch - param',param)

    if (param) 
    {
      filter = eventMethod.filter([param])
    } 
    else 
    {
      filter = eventMethod.filter([])
    }

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

  async voteLookup() 
  {

    log('voteLookup - ArbitrationFactoryABI',this.contract)
    const voteLookupABI = this.getMethodABI("VOTE_LOCKUP");
    log('voteLookup - voteLookupABI',voteLookupABI)

    
    const voteLookupMethod = this.thorAccount.method(voteLookupABI)
    
    
    const voteLookupResult = await voteLookupMethod.call();  
    log('voteLookup - voteLookupResult',voteLookupResult)
      
    return voteLookupResult.decoded[0]

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

  async getWinner() 
  {

    log('getWinner - ArbitrationFactoryABI',this.contract)
    const getWinnerABI = this.getMethodABI("getWinner");
    log('getWinner - getWinnerABI',getWinnerABI)
    
    
    const getWinnerMethod = this.thorAccount.method(getWinnerABI)
    
    
    const getWinner = await getWinnerMethod.call(); 
    
    log('getWinner - getWinner',getWinner)

    return getWinner.decoded[0]

  }

  async canClaimReward(account, start = 0, end = 999999 ) 
  {
    log('canClaimReward - ArbitrationFactoryABI',this.contract)
    const canClaimRewardABI = this.getMethodABI("canClaimReward");
    log('canClaimReward - canClaimRewardABI',canClaimRewardABI)
    
    
    const canClaimRewardMethod = this.thorAccount.method(canClaimRewardABI)

    canClaimRewardMethod.caller(account)
    
    
    const canClaimReward = await canClaimRewardMethod.call(start, end);
    
    log('canClaimReward - canClaimReward',canClaimReward)

    return canClaimReward.decoded

  }

  async canWithdraw(party) 
  {

    log('canWithdraw - ArbitrationFactoryABI',this.contract)
    const canWithdrawABI = this.getMethodABI("canWithdraw");
    log('canWithdraw - canWithdrawABI',canWithdrawABI)
    
    
    const canWithdrawMethod = this.thorAccount.method(canWithdrawABI)
    
    canWithdrawMethod.caller(party)
    
    const canWithdraw = await canWithdrawMethod.call(); 
    
    log('canWithdraw - canWithdraw',canWithdraw)

    return canWithdraw

  }

  async calcDisputeEnds() 
  {

    log('calcDisputeEnds - ArbitrationFactoryABI',this.contract)
    const calcDisputeEndsABI = this.getMethodABI("calcDisputeEnds");
    log('calcDisputeEnds - calcDisputeEndsABI',calcDisputeEndsABI)
    
    const calcDisputeEndsMethod = this.thorAccount.method(calcDisputeEndsABI)

    let hash = '';
    
    await calcDisputeEndsMethod.call().then(output=>{
      log('calcDisputeEnds - calcDisputeEndsMethod',output)
      log('calcDisputeEnds - calcDisputeEndsMethod',output.data)

      hash = output.decoded[0];
      
    })

    return hash;

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

    const result = await signingService.request([
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
        _party: account,
      }
      
      global.dispatcher({type: ADD_TRANSACTION,txid: tx.txid, event: 'ContractAgreed', param: filter, contract_id: contractId})
      

      log('agree - signingService then() txid',txid)

      return true
      
    }).catch(err=>{  
      log('agree - signingService catch() err',err)

      return false
    })

    return result

  }

  async unsign(account, contractId) 
  {
    
    const unsignABI = this.getMethodABI("unsign");

    log('unsign - unsignABI',unsignABI)    

    const unsignMethod = this.thorAccount.method(unsignABI)

    log('unsign - unsignMethod',unsignMethod)
    

    // --##################--- asClause

    log('unsign - parameter',{account})

    const unsignClause = unsignMethod.asClause()
    
    log('unsign - unsignClause',unsignClause) 
    
    const signingService = global.connex.vendor.sign('tx')
    
    log('unsign - signingService',signingService)


    signingService
    .signer(account) // Enforce signer
    .gas(global.connex.thor.genesis.gasLimit) // Set maximum gas
    .link('http://localhost:3000/contracts/detail/'+contractId) // User will be back to the app by the url https://connex.vecha.in/0xffff....
    .comment('unsign contract')

    let txid = null

    const result = await signingService.request([
      {
        ...unsignClause,
      }
    ])
    .then(async (tx)=>{

      log('unsign - signingService then()',tx)

      // call transaction saving endpoint
      // ADD_TRANSACTION
      
      txid = tx.txid

      const filter = {
        _party: account,
      }
      
      global.dispatcher({type: ADD_TRANSACTION,txid: tx.txid, event: 'ContractUnsigned', param: filter, contract_id: contractId})
      

      log('unsign - signingService then() txid',txid)

      return true
      
    }).catch(err=>{  
      log('unsign - signingService catch() err',err)

      return false
    })

    return result

  }

  async payoutVoter(account, contractId, start = 0, end = 999999) 
  {
    
    const payoutVoterABI = this.getMethodABI("payoutVoter");

    log('payoutVoter - payoutVoterABI',payoutVoterABI)    

    const payoutVoterMethod = this.thorAccount.method(payoutVoterABI)

    log('payoutVoter - payoutVoterMethod',payoutVoterMethod)
    

    // --##################--- asClause

    log('payoutVoter - parameter',{account})

    const payoutVoterClause = payoutVoterMethod.asClause(start,end)
    
    log('payoutVoter - payoutVoterClause',payoutVoterClause) 
    
    const signingService = global.connex.vendor.sign('tx')
    
    log('payoutVoter - signingService',signingService)


    signingService
    .signer(account) // Enforce signer
    .gas(global.connex.thor.genesis.gasLimit) // Set maximum gas
    .link('http://localhost:3000/contracts/detail/'+contractId) // User will be back to the app by the url https://connex.vecha.in/0xffff....
    .comment('payoutVoter contract')

    let txid = null

    const result = await signingService.request([
      {
        ...payoutVoterClause,
      }
    ])
    .then(async (tx)=>{

      log('payoutVoter - signingService then()',tx)

      // call transaction saving endpoint
      // ADD_TRANSACTION
      
      txid = tx.txid

      const filter = {
        _voter: account,
      }
      
      global.dispatcher({type: ADD_TRANSACTION,txid: tx.txid, event: 'VoterPayout', param: filter, contract_id: contractId})
      

      log('payoutVoter - signingService then() txid',txid)
      return true
    }).catch(err=>{  
      log('agree - signingService catch() err',err)
      return false
    })

    return result

  }

  async payoutParty(account, contractId) 
  {
    
    const payoutPartyABI = this.getMethodABI("payoutParty");

    log('payoutParty - payoutPartyABI',payoutPartyABI)    

    const payoutPartyMethod = this.thorAccount.method(payoutPartyABI)

    log('payoutParty - payoutPartyMethod',payoutPartyMethod)
    

    // --##################--- asClause

    log('payoutParty - parameter',{account})

    const payoutPartyClause = payoutPartyMethod.asClause()
    
    log('payoutParty - payoutPartyClause',payoutPartyClause) 
    
    const signingService = global.connex.vendor.sign('tx')
    
    log('payoutParty - signingService',signingService)


    signingService
    .signer(account) // Enforce signer
    .gas(global.connex.thor.genesis.gasLimit) // Set maximum gas
    .link('http://localhost:3000/contracts/detail/'+contractId) // User will be back to the app by the url https://connex.vecha.in/0xffff....
    .comment('payoutParty contract')

    let txid = null

    const result = await signingService.request([
      {
        ...payoutPartyClause,
      }
    ])
    .then(async (tx)=>{

      log('payoutParty - signingService then()',tx)

      // call transaction saving endpoint
      // ADD_TRANSACTION
      
      txid = tx.txid

      const filter = {
        _party: account,
      }
      
      global.dispatcher({type: ADD_TRANSACTION,txid: tx.txid, event: 'PartyPayout', param: filter, contract_id: contractId})
      

      log('payoutParty - signingService then() txid',txid)

      return true
      
    }).catch(err=>{  
      log('agree - signingService catch() err',err)
      return false
    })

    return result

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

    const result = await signingService.request([
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

      return true
      
    }).catch(err=>{  
      log('withdrawDispersal - signingService catch() err',err)
      return false
    })

    return result

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

    const result = await signingService.request([
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

      return true
    }).catch(err=>{  
      log('amendDisputeDispersal - signingService catch() err',err)
      return false
    })

    return result

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