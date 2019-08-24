import contract from "truffle-contract";
import toAsciiFromByte32 from "../utils/toAsciiFromByte32";
import JURTokenABI from "../build/contracts/JURToken.json";

let jurTokenSCInstance = null;

export default class JURToken {
  constructor() {
    if (!jurTokenSCInstance) {
      jurTokenSCInstance = this;
      this.web3 = window.web3;
      this.contract = contract(JURTokenABI);
      this.contract.setProvider(this.web3.currentProvider);

      this.signatures = {
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

    return jurTokenSCInstance;
  }

  /**
   * @notice Returns JUR token balance of given address
   */
  async balanceOf(address) {
    if (typeof address === 'undefined' || !address) {
      const [account] = await this.web3.eth.getAccounts();
      address = account;
    }
    const instance = await this.contract.deployed();
    return instance.balanceOf(address);
  }

  /**
   * @notice Approve JUR token transfer amount for given address
   */
  async approve(address, amount) {
    const instance = await this.contract.deployed();
    const [account] = await this.web3.eth.getAccounts();
    return instance.approve(address, this.web3.utils.toBN(amount), {
      from: account
    });
  }

  /**
   * @notice Returns JUR token transfer amount allowed for given address
   */
  async allowance(spender, owner) {
    const instance = await this.contract.deployed();
    const [account] = await this.web3.eth.getAccounts();
    if (typeof owner === 'undefined' || !owner) {
      owner = account;
    }
    return instance.allowance(owner, spender);
  }

  /**
   * @dev Adds / removes functions from list of functions which are allowed with approve and call
   * @param _sig Signature of function to add / remove
   * @param _valid Whether the function should be added or removed
   */
  async setAllowedFunction(method, _valid) {
    if (typeof this.signatures[method] === "undefined") return;

    if (typeof _valid === "undefined") _valid = true;

    const _sig = global.drizzle.web3.eth.abi.encodeFunctionSignature(
      this.signatures[method]
    );

    const instance = await this.contract.deployed();
    const [account] = await this.web3.eth.getAccounts();

    return instance.setAllowedFunction(_sig, _valid, { from: account });
  }

  /**
   * @dev Addition to ERC20 token methods. It allows to
   * @dev approve the transfer of value and execute a call with the sent data.   *
   *
   * @param _spender The address that will spend the funds.
   * @param _value The amount of tokens to be spent.
   * @param _data ABI-encoded contract call to call `_to` address.
   *
   * @return true if the call function was executed successfully
   */
  async approveAndCall(address, amount, method, params) {
    const instance = await this.contract.deployed();

    const [account] = await this.web3.eth.getAccounts();

    const data = global.drizzle.web3.eth.abi.encodeFunctionCall(
      this.signatures[method],
      [...params]
    );

    return instance.approveAndCall(
      address,
      this.web3.utils.toBN(amount),
      data,
      { from: account }
    );
  }
}
