

import ArbitrationContractABI from "../../build/contracts/Arbitration.json";

import { log } from "../../utils/helpers";


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