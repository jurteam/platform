import contract from "truffle-contract";
import toAsciiFromByte32 from "../utils/toAsciiFromByte32";
import JURTokenABI from "../build/contracts/JURToken.json";

let instance = null;

export default class JURToken {
  constructor() {
    if (!instance) {
      instance = this;
      this.web3 = window.web3;
      this.contract = contract(JURTokenABI);
      this.contract.setProvider(this.web3.currentProvider);
    }

    return instance;
  }

  async approve(address, amount) {
    console.log('class JURToken – approve');
    const instance = await this.contract.deployed();
    console.log('class JURToken – approve – deployed', instance);
    console.log('class JURToken – approve – this.web3', this.web3);
    // const {
    //   eth: {
    //     accounts: [account]
    //   }
    // } = this.web3;
    // console.log('class JURToken – account', account);
    const [ account ] = await this.web3.eth.getAccounts()
    console.log('class JURToken – approve – account', account);
    return instance.approve(address, this.web3.utils.toBN(amount), { from: account });
  }

  async allowance(address) {
    const instance = await this.contract.deployed();
    const {
      eth: {
        accounts: [account]
      }
    } = this.web3;
    return instance.approve(account, address);
  }
}
