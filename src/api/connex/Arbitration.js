

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

  // getArbitrationContractAddres()
  // {

  //   const thorGenesisId = global.connex.thor.genesis.id;

  //   const chainTag = thorGenesisId.substr(-2);

  //   log('getArbitrationContractAddres - chainTag',chainTag);

  //   let chainNetworkID;

  //   switch(chainTag) {
  //     case '4a':  // mainnet
  //       chainNetworkID = 1;
  //       break;
  //     case '27':  // testnet
  //       chainNetworkID = 3;
  //       break;
  //     default:      // localhost / other
  //       chainNetworkID = 5777;
  //       break;
  //   }
  //   log('getArbitrationContractAddres - ArbitrationContract.networks[chainNetworkID].address',this.contract.networks[chainNetworkID].address);
  //   return this.contract.networks[chainNetworkID].address;

  // }


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