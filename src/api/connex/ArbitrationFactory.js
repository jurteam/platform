

import ArbitrationFactoryABI from "../../build/contracts/ArbitrationFactory.json";
import { log } from "../../utils/helpers";

import { 
  ADD_TRANSACTION,
} from "../../reducers/types";




export default class connexArbitrationFactory
{
  constructor() 
  {
    this.contract = ArbitrationFactoryABI;
    this.thorAccount = global.connex.thor.account(this.getArbitrationFactoryAddres())
  }

  /**
   * @notice Returns JUR token balance of given address
   */
  async createArbitration(parties, dispersal, funding, agreementHash, account, contractId) 
  {
    
    const createArbitrationABI = this.getMethodABI("createArbitration");

    log('createArbitration - createArbitrationABI',createArbitrationABI)
    

    const createArbitrationMethod = this.thorAccount.method(createArbitrationABI)


    log('createArbitration - createArbitrationMethod',createArbitrationMethod)
    

    // --##################--- asClause

    log('createArbitration - parameter',{parties, dispersal, funding, agreementHash})

    const createArbitrationClause = createArbitrationMethod.asClause(parties, dispersal, funding, agreementHash)
    
    log('createArbitration - createArbitrationClause',createArbitrationClause)
 
    
    const signingService = global.connex.vendor.sign('tx')
    
    log('createArbitration - signingService',signingService)


    signingService
    .signer(account) // Enforce signer
    .gas(global.connex.thor.genesis.gasLimit) // Set maximum gas
    .link('http://localhost:3000/contracts/detail/'+contractId) // User will be back to the app by the url https://connex.vecha.in/0xffff....
    .comment('create contract')

    let txid = null

    await signingService.request([
      {
        ...createArbitrationClause,
      }
    ])
    .then(async (tx)=>{

      log('createArbitration - signingService then()',tx)

      // call transaction saving endpoint
      // ADD_TRANSACTION
      
      txid = tx.txid

      const filter = {
        _creator: account,
        _party1: parties[0],
        _party2: parties[1],
      }
      
      global.dispatcher({type: ADD_TRANSACTION,txid: tx.txid, event: 'ArbitrationCreated', param: filter, contract_id: contractId})
      

      log('createArbitration - signingService then() txid',txid)
      
    }).catch(err=>{  
      log('createArbitration - signingService catch() err',err)
    })



  }

  async ArbitrationCreated(creator,txid) 
  {

    const transferEventABI = this.getMethodABI("ArbitrationCreated");

    const transferEvent = this.thorAccount.event(transferEventABI)

    const filter = transferEvent.filter([{
      _creator: creator
    }])
    
    filter.order('desc') 
    
    const events = await filter.apply(0, 1)

    log('ArbitrationCreated - events',events)
    log('ArbitrationCreated - events.length',events.length)
    log('ArbitrationCreated - events[0]',events[0])

    if (events) 
    {
      const lastEvent = events[0]
      log('ArbitrationCreated - lastEvent',lastEvent)
      if (lastEvent) 
      {
        log('ArbitrationCreated - txid',txid)
        log('ArbitrationCreated - lastEvent.meta.txid',lastEvent.meta.txID)
        if (lastEvent.meta.txID === txid) 
        {
          log('ArbitrationCreated - lastEvent.decoded[1]',lastEvent.decoded[1])
          log('ArbitrationCreated - lastEvent.decoded._arbitration',lastEvent.decoded._arbitration)
          return lastEvent.decoded[1]
        }
      }
    }
    return null

  }

  async EventCatch(param, event, blockNum, txid)
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

  async generateHash(string) 
  {

    log('generateHash - ArbitrationFactoryABI',this.contract)
    const generateHashABI = this.getMethodABI("generateHash");
    log('generateHash - generateHashABI',generateHashABI)
    
    // log('generateHash - address',address)

    const generateHashMethod = this.thorAccount.method(generateHashABI)

    // Set this method to expire when my account being seen
    // generateHashMethod.cache([])
    // Get balance of my account, we will get cached result on most blocks
    // Event Transfer(_from = '0x7567d83b7b8d80addcb281a71d54fc7b3364ffed', ....) would make cache expired
    

    let hash = '';
    
    await generateHashMethod.call(string).then(output=>{
      log('generateHash - generateHashMethod',output)
      log('generateHash - generateHashMethod',output.data)

      // userBalance = output.decoded[0];
      hash = output.decoded[0];
      
      // log('generateHash - userBalance (then)',userBalance)
    })

    return hash;

  }

  async getAddressByTransaction(txid)  
  {

    let contractAddress

    let tx =  global.connex.thor.transaction(txid);
    // // let tx = await global.connex.thor.transaction('0xb1fde169718049e7bdaec7c459a429c188c5ce5e8f582a4a8b3def4d0f8aefee'); // buono
    // // let tx = await global.connex.thor.transaction('0xd70540b07a8cf19e0b20534c1824257be7d983343506cb47185df183d43f917b');

    log('getAddressByTransaction - tx',tx)

    // const sleep = (milliseconds) => {
    //   return new Promise(resolve => setTimeout(resolve, milliseconds))
    // }

    // await sleep(5000)


   await tx.getReceipt()
      .then(txr=>{
        log('getAddressByTransaction - tx getReceipt()',txr)
        
        if (txr !== null) {
          const { outputs } = txr;
          const { events } = outputs[0];
          const { address } = events[0];
          
          log('getAddressByTransaction - tx getReceipt() - address',address)
          contractAddress = address
        }

      }).catch(err=>{

        log('getAddressByTransaction - tx getReceipt() err',err)
      })

      return contractAddress

  }



  getArbitrationFactoryAddres()
  {

    const thorGenesisId = global.connex.thor.genesis.id;

    const chainTag = thorGenesisId.substr(-2);

    log('getArbitrationFactoryAddres - chainTag',chainTag);

    let chainNetworkID;

    switch(chainTag) {
      case '4a':  // mainnet
        chainNetworkID = 1;
        break;
      case '27':  // testnet
        chainNetworkID = 3;
        break;
      default:      // localhost / other
        chainNetworkID = 5777;
        break;
    }
    log('getArbitrationFactoryAddres - ArbitrationFactory.networks[chainNetworkID].address',this.contract.networks[chainNetworkID].address);
    return this.contract.networks[chainNetworkID].address;

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