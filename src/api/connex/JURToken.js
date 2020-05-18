import JURTokenABI from "../../build/contracts/JURToken.json";

import { log } from "../../utils/helpers";

import {
  ADD_TRANSACTION,
  TRANSACTION_ADDED,
  UPDATE_TRANSACTION,
  TRANSACTION_UPDATED,
  TRANSACTIONS_FETCHED
} from "../../reducers/types";

export default class connexJURToken {
  constructor() {
    this.contract = JURTokenABI;
    this.thorAccount = global.connex.thor.account(this.getJURTokenAddres());

    this.signatures = {
      takeAnOath: {
        inputs: [
          {
            name: "_lockInPeriod",
            type: "uint256"
          }
        ],
        name: "takeAnOath",
        type: "function"
      },
      sign: {
        name: "signJUR",
        type: "function",
        inputs: [
          {
            type: "address",
            name: "_sender"
          }
        ]
      },
      proposeAmendment: {
        name: "proposeAmendmentJUR",
        type: "function",
        inputs: [
          {
            type: "address",
            name: "_sender"
          },
          {
            type: "uint256[]",
            name: "_dispersal"
          },
          {
            type: "uint256[]",
            name: "_funding"
          },
          {
            type: "bytes32",
            name: "_agreementHash"
          }
        ]
      },
      agreeAmendment: {
        name: "agreeAmendmentJUR",
        type: "function",
        inputs: [
          {
            type: "address",
            name: "_sender"
          }
        ]
      },
      dispute: {
        name: "disputeJUR",
        type: "function",
        inputs: [
          {
            type: "address",
            name: "_sender"
          },
          {
            type: "uint256",
            name: "_voteAmount"
          },
          {
            type: "uint256[]",
            name: "_dispersal"
          }
        ]
      },
      vote: {
        name: "voteJUR",
        type: "function",
        inputs: [
          {
            type: "address",
            name: "_sender"
          },
          {
            type: "address",
            name: "_voteAddress"
          },
          {
            type: "uint256",
            name: "_voteAmount"
          }
        ]
      }
    };
  }

  /**
   * @notice Returns JUR token balance of given address
   */
  async balanceOf(address) {
    // Caching for method balanceOf, for my addresses
    // Solidity function balanceOf(address _owner) public view returns(uint256 balance)

    log("balanceOf - JURTokenABI", this.contract);
    const balanceOfABI = this.getMethodABI("balanceOf");
    log("balanceOf - balanceOfABI", balanceOfABI);

    log("balanceOf - address", address);

    const balanceOfMethod = this.thorAccount.method(balanceOfABI);
    // Set this method to expire when my account being seen
    balanceOfMethod.cache([address]);
    // Get balance of my account, we will get cached result on most blocks
    // Event Transfer(_from = '0x7567d83b7b8d80addcb281a71d54fc7b3364ffed', ....) would make cache expired

    let userBalance = 0;

    await balanceOfMethod.call(address).then(output => {
      log("balanceOf - balanceOfMethod", output);

      userBalance = output.decoded[0];

      log("balanceOf - userBalance (then)", userBalance);
    });

    return userBalance;
  }

  approveClause = (spender, amount) => {
    const approveMethod = this.thorAccount.method(this.getMethodABI("approve"));
    return approveMethod.asClause(spender, amount);
  };

  approve = (address, spender, amount) => {
    const approveClause = this.approveClause(spender, amount);

    const signingService = global.connex.vendor.sign("tx");

    signingService
      .signer(address)
      .gas(global.connex.thor.genesis.gasLimit)
      .link("https://connex.vecha.in/{txid}")
      .comment("Approve an amount to be used later on");

    return signingService.request([
      {
        comment: "approve amount",
        ...approveClause
      }
    ]);
  };

  async approveAndCall(address, amount, method, params, account, contractId) {
    const approveAndCallABI = this.getMethodABI("approveAndCall");

    log("approveAndCall - approveAndCallABI", approveAndCallABI);

    const approveAndCallMethod = this.thorAccount.method(approveAndCallABI);

    log("approveAndCall - approveAndCallMethod", approveAndCallMethod);

    // ----------- Method to call

    const methodToCallABI = this.signatures[method];
    const methodToCallMethod = this.thorAccount.method(methodToCallABI);
    log("approveAndCall - methodToCallMethod", params, methodToCallMethod);

    const methodToCallClause = methodToCallMethod.asClause(...params);

    log("approveAndCall - methodToCallClause", methodToCallClause);

    // return null

    const data = methodToCallClause.data;

    // const data = this.web3.eth.abi.encodeFunctionCall(
    //   this.signatures[method],
    //   [...params]
    //   );

    const approveAndCallClause = approveAndCallMethod.asClause(
      address,
      amount,
      data
    );

    log(
      "approveAndCall - approveAndCallClause's data",
      approveAndCallClause.data
    );

    const signingService = global.connex.vendor.sign("tx");

    log("approveAndCall - signingService", signingService);
    log("VTHO gas limit " + global.connex.thor.genesis.gasLimit);
    signingService
      .signer(account) // Enforce signer
      .gas(global.connex.thor.genesis.gasLimit) // Set maximum gas
      .link("http://localhost:3000/contracts/detail/" + contractId) // User will be back to the app by the url https://connex.vecha.in/0xffff....
      .comment("sign contract");

    log("approveAndCall - signingService", signingService);

    let txid = null;
    // let waitingEvent = '';

    // switch (method) {
    //   case 'sign':
    //     waitingEvent = 'ContractSigned';
    //     break;

    //   case 'dispute':
    //     waitingEvent = 'ContractDisputed';
    //     break;

    //   default:
    //     break;
    // }

    let transactionRequest = await signingService.request([
      {
        ...approveAndCallClause
      }
    ]);

    // .then(async (tx)=>{

    //   log('approveAndCall - signingService then()',tx)

    //   txid = tx.txid
    //   log('approveAndCall - signingService then() txid',txid)

    //     // event to wait:           ContractSigned
    //     // param to search event:   _party

    //   const filter = {
    //     _party: account,
    //   }

    //   global.dispatcher({type: ADD_TRANSACTION,txid: tx.txid, event: waitingEvent, param: filter, contract_id: contractId})

    //   // return txid

    //   // let ijdfsoijsdf = await this.getAddressByTransaction(txid)

    //   // log('ijdfsoijsdf',ijdfsoijsdf)

    // }).catch(err=>{
    //   log('approveAndCall - signingService catch() err',err)
    // })

    txid = transactionRequest.txid;
    log("approveAndCall - signingService then() txid", txid);

    // event to wait:           ContractSigned
    // param to search event:   _party

    // const filter = {
    //   _party: account,
    // }

    // global.dispatcher({type: ADD_TRANSACTION,txid: tx.txid, event: waitingEvent, param: filter, contract_id: contractId})

    return txid;
  }

  getJURTokenAddres() {
    const thorGenesisId = global.connex.thor.genesis.id;

    const chainTag = thorGenesisId.toString().substr(-2);

    log("getJURTokenAddres - chainTag", chainTag);

    let chainNetworkID;

    switch (chainTag) {
      case "4a": // mainnet
        chainNetworkID = 1;
        break;
      case "27": // testnet
        chainNetworkID = 3;
        break;
      default:
        // localhost / other
        chainNetworkID = 5777;
        break;
    }

    const address = "0xc236C04634839334211CD19Ef8D1CF291508478d"; // unlimited
    // const address = JURTokenABI.networks[chainNetworkID].address;
    log(
      "getJURTokenAddres - JURToken.networks[" + chainNetworkID + "].address",
      address
    );
    return address;
  }

  getMethodABI(method) {
    let methABI = null;
    this.contract.abi.forEach(meth => {
      if (meth.name === method) {
        methABI = meth;
      }
    });

    return methABI;
  }
}
