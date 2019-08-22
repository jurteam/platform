import contract from "truffle-contract";
import toAsciiFromByte32 from "../utils/toAsciiFromByte32";
import getWeb3 from "../utils/getWeb3";
import ArbitrationContractABI from "../build/contracts/Arbitration.json";

let instance = null;

export default class ArbitrationContract {
  constructor(address) {
    if (!instance) {
      instance = this;
      this.web3 = window.web3;
      this.contract = contract({...global.drizzle.contracts[address], networks: { "5777": { address } }});
      console.log('handleAcceptArbitration sign - contract', this.contract)
      this.contract.setProvider(this.web3.currentProvider);
      // this.contract(address)
      // this.contract.setProvider(this.web3.currentProvider);
    }

    this.address = address
    console.log('handleAcceptArbitration – address', address)

    return instance;
  }

  async sign() {
    console.log('handleAcceptArbitration sign', 'start')
    console.log('handleAcceptArbitration sign - at', this.address)
    // await this.contract.at(this.address);
    console.log('handleAcceptArbitration sign - deployed?')
    const instance = await this.contract.deployed();
    console.log('handleAcceptArbitration sign - call')
    const [ account ] = await this.web3.eth.getAccounts()
    return instance.sign({from: account});
  }

  /*
  async updateCandidatesEventListener(callback) {
    const contractInstance = await this.contract.deployed()
    const updateCandidatesEvent = contractInstance.UpdateCandidates()
    return updateCandidatesEvent.watch(callback)
  }

  async proposeCandidate() {
    // TODO: This could receive a candidate's name as a parameter
    const getRandomUserURL = 'https://randomuser.me/api/?nat=us'
    const { eth: { accounts: [ account ] } } = this.web3
    const contractInstance = await this.contract.deployed()
    const {
      results: [{
        name: { first, last },
        id: { value: id },
      }]
    } = await fetch(getRandomUserURL)
      .then(response => response.json())

    return contractInstance
      .postulateCandidate(`${first} ${last} ${id}`, { from: account })
  }

  async castVote(candidateName) {
    const { eth: { accounts: [ account ] } } = this.web3
    const contractInstance = await this.contract.deployed()
    return contractInstance.voteForCandidate(candidateName, { from: account })
  }

  async getAllCandidates() {
    const contractInstance = await this.contract.deployed()
    const candidateList = (await contractInstance.listCandidates())
      .map(candidate => toAsciiFromByte32(candidate))

    return Promise.all(candidateList.map(
        (candidate) => contractInstance.getCandidateVotes.call(candidate)
      ))
      .then(allVotes => allVotes.map((votes, index) => ({
        name: candidateList[index],
        votes: Number(votes.toString()),
      })))
  }

  async getCandidateVotes(candidate) {
    const contractInstance = await this.contract.deployed()
    const result = await contractInstance.getCandidateVotes.call(candidate.name)
    return {
      candidate: candidate.name,
      votes: Number(result.toString())
    }
  }
  */
}
