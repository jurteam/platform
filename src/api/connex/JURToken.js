

import JURTokenABI from "../../build/contracts/JURToken.json";

import { log } from "../../utils/helpers";


export default class connexJURToken 
{
  constructor() 
  {
    this.contract = JURTokenABI;
  }

  /**
   * @notice Returns JUR token balance of given address
   */
  async balanceOf(address) 
  {
    
    // Caching for method balanceOf, for my addresses
    // Solidity function balanceOf(address _owner) public view returns(uint256 balance) 


    log('balanceOf - JURTokenABI',this.contract)
    const balanceOfABI = this.getMethodABI("balanceOf");
    log('balanceOf - balanceOfABI',balanceOfABI)
    
    log('balanceOf - address',address)

    const balanceOfMethod = global.connex.thor.account(this.getJURTokenAddres()).method(balanceOfABI)
    // Set this method to expire when my account being seen
    balanceOfMethod.cache([address])
    // Get balance of my account, we will get cached result on most blocks
    // Event Transfer(_from = '0x7567d83b7b8d80addcb281a71d54fc7b3364ffed', ....) would make cache expired
    
    let userBalance = 0;
    
    await balanceOfMethod.call(address).then(output=>{
      log('balanceOf - balanceOfMethod',output)

      userBalance = output.decoded[0];
      
      log('balanceOf - userBalance (then)',userBalance)
    })

    return userBalance;
  }

  getJURTokenAddres()
  {

    const thorGenesisId = global.connex.thor.genesis.id;

    const chainTag = thorGenesisId.substring(-2);

    log('getJURTokenAddres - chainTag',chainTag);

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
    log('getJURTokenAddres - JURToken.networks[chainNetworkID].address',this.contract.networks[chainNetworkID].address);
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