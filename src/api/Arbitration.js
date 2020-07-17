import contract from "truffle-contract";
import { log } from "../utils/helpers";
// import toAsciiFromByte32 from "../utils/toAsciiFromByte32";

let arbitrationSCInstance = null;

export default class ArbitrationContract {
  constructor(address) {

    log("ArbitrationContract", address)
    log("ArbitrationContract – global.drizzle.contracts[address]", global.drizzle.contracts[address])


    // define easy access variables
    this.address = address;

    this.DISPUTE_VOTE_DURATION = null;
    this.DISPUTE_DISPERSAL_DURATION = null;
    this.DISPUTE_WINDOW = null;
    this.DISPUTE_EXTENSION = null;
    this.VOTE_LOCKUP = null;
    this.DISPUTE_WINDOW_MAX = null;
    this.MIN_VOTE = null;
    this.MIN_WIN = null;

    // *** Removed to avoid SC cache for actions made on contracts during dApp navigation without page reload. ***
    // if (!arbitrationSCInstance) {
      arbitrationSCInstance = this;
      this.web3 = window.web3;
      this.contract = contract({
        ...global.drizzle.contracts[address],
        networks: { "1": { address }, "3": { address }, "5777": { address } }
      });
      this.contract.setProvider(this.web3.currentProvider);
      this.gameTheory(); // get game theory vars
    // }

    log("ArbitrationContract – arbitrationSCInstance", arbitrationSCInstance)

    return arbitrationSCInstance;
  }

  // Helpers
  /**
   * @notice Returns all infos regarding the game theory
   */
  async gameTheory() {
    if (this.contract) {

      const instance = await this.contract.deployed();

      this.DISPUTE_VOTE_DURATION = await instance.DISPUTE_VOTE_DURATION();
      this.DISPUTE_DISPERSAL_DURATION = await instance.DISPUTE_DISPERSAL_DURATION();
      this.DISPUTE_WINDOW = await instance.DISPUTE_WINDOW();
      this.DISPUTE_EXTENSION = await instance.DISPUTE_EXTENSION();
      this.VOTE_LOCKUP = await instance.VOTE_LOCKUP();
      this.DISPUTE_WINDOW_MAX = await instance.DISPUTE_WINDOW_MAX();
      this.MIN_VOTE = await instance.MIN_VOTE();
      this.MIN_WIN = await instance.MIN_WIN();
    }

    return;
  }

  /**
   * @notice Returns contract agreement hash detail
   * @notice Decoded value is a stringified object of arbitration kpi and resolution proof
   */
  async agreementHash() {
    const instance = await this.contract.deployed();
    const [account] = await this.web3.eth.getAccounts();
    return instance.agreementHash({ from: account });
  }

  /**
   * @notice Returns a contract parties based on numeric key reference
   */
  async allParties(key) {
    const instance = await this.contract.deployed();
    if (typeof key === 'undefined' || !key) { // return all parties
      const partyA = await instance.allParties(0);  // 0 = a / first party
      const partyB = await instance.allParties(1);  // 1 = b
      return [ partyA, partyB ];
    } else { // single party based on key
      return instance.allParties(key);
    }
  }

  /**
   * @notice Returns contract dispersal
   */
  async dispersal(address) {
    const instance = await this.contract.deployed();
    if (typeof address === 'undefined' || !address) {
      const [account] = await this.web3.eth.getAccounts();
      address = account;
    }
    return instance.dispersal(address);
  }

  /**
   * @notice Returns contract disputeStarts
   */
  async disputeStarts() {
    const instance = await this.contract.deployed();
    return instance.disputeStarts();
  }

  /**
   * @notice Returns contract disputeEnds
   */
  async disputeEnds() {
    const instance = await this.contract.deployed();
    return instance.disputeEnds();
  }

  /**
   * @notice Returns contract disputeWindowVotes
   */
  async disputeWindowVotes() {
    const instance = await this.contract.deployed();
    return instance.disputeWindowVotes();
  }

  /**
   * @notice Returns contract totalVotes
   */
  async totalVotes() {
    const instance = await this.contract.deployed();
    return instance.totalVotes();
  }

  /**
   * @notice Returns current timestamp
   */
  async getNow() {
    const instance = await this.contract.deployed();
    return instance.getNow();
  }

  /**
   * @notice Returns boolean if party address has signed or not
   */
  async hasSigned(address) {
    if (typeof address === 'undefined' || !address) {
      const [account] = await this.web3.eth.getAccounts();
      address = account;
    }
    const instance = await this.contract.deployed();
    return instance.hasSigned(address);
  }

  /**
   * @notice Returns boolean if party address has agreed or not
   */
  async hasAgreed(address) {
    if (typeof address === 'undefined' || !address) {
      const [account] = await this.web3.eth.getAccounts();
      address = account;
    }
    const instance = await this.contract.deployed();
    return instance.hasAgreed(address);
  }

  /**
   * @notice Returns boolean if party address has widthdrawn or not
   */
  async hasWithdrawn(address) {
    if (typeof address === 'undefined' || !address) {
      const [account] = await this.web3.eth.getAccounts();
      address = account;
    }
    const instance = await this.contract.deployed();
    return instance.hasWithdrawn(address);
  }

  /**
   * @notice Returns boolean if party address has funded amendment or not
   */
  async hasFundedAmendment(address) {
    if (typeof address === 'undefined' || !address) {
      const [account] = await this.web3.eth.getAccounts();
      address = account;
    }
    const instance = await this.contract.deployed();
    return instance.hasFundedAmendment(address);
  }

  // Signs
  /**
   * @dev Allows sender to sign agreeement
   */
  async sign() {
    const instance = await this.contract.deployed();
    log("handleAcceptArbitration - Arbitration instance", instance);
    const [account] = await this.web3.eth.getAccounts();
    return instance.sign({ from: account });
  }

  /**
   * @dev Allows sender to unsign agreeement
   */
  async unsign() {
    const instance = await this.contract.deployed();
    const [account] = await this.web3.eth.getAccounts();
    return instance.unsign({ from: account });
  }

  // Simple close
  /**
   * @dev Allows sender to agree dispersals (so that funds can be dispursed)
   */
  async agree() {
    const instance = await this.contract.deployed();
    const [account] = await this.web3.eth.getAccounts();
    return instance.agree({ from: account });
  }

  /**
   * @dev Allows sender to unagree dispersals (so that funds cannot be dispursed)
   */
  async unagree() {
    const instance = await this.contract.deployed();
    const [account] = await this.web3.eth.getAccounts();
    return instance.unagree({ from: account });
  }

  // Friendly
  /**
   * @dev Allows sender to propose a new dispersal and agreement hash
   * @param _dispersal Dispersal of funds if arbitration agreed
   * @param _funding Source of funds for arbitration
   * @param _agreementHash Hash of arbitration agreement
   */
  async proposeAmendment(dispersal, funding, agreementHash) {
    const instance = await this.contract.deployed();
    const [account] = await this.web3.eth.getAccounts();
    return instance.proposeAmendment(dispersal, funding, agreementHash, { from: account });
  }

  /**
   * @dev Allows sender to agree an amendment to dispersals and agreement hash
   */
  async agreeAmendment() {
    const instance = await this.contract.deployed();
    const [account] = await this.web3.eth.getAccounts();
    return instance.agreeAmendment({ from: account });
  }

  /**
   * @dev Allows sender to unagree an amendment to dispersals and agreement hash
   */
  async unagreeAmendment() {
    const instance = await this.contract.deployed();
    const [account] = await this.web3.eth.getAccounts();
    return instance.unagreeAmendment({ from: account });
  }

  // Dispute
  /**
   * @dev Allows sender to put the arbitration into a dispute State
   * @param _voteAmount Amount of tokens to stake to the disputing parties side
   * @param _dispersal Dispersal should the disputing party win
   */
  async dispute(amount, dispersal) {
    const instance = await this.contract.deployed();
    const [account] = await this.web3.eth.getAccounts();
    return instance.dispute(this.web3.utils.toBN(amount), dispersal, { from: account });
  }

  /**
   * @dev Calculates the current end time of the voting period
   */
  async calcDisputeEnds() {
    const instance = await this.contract.deployed();
    const [account] = await this.web3.eth.getAccounts();
    return instance.calcDisputeEnds({ from: account });
  }

  /**
   * @dev Allows sender to amend their dispersals should they win
   * @param _dispersal Dispersal should the disputing party win
   */
  async amendDisputeDispersal(dispersal) {
    const instance = await this.contract.deployed();
    const [account] = await this.web3.eth.getAccounts();
    return instance.amendDisputeDispersal(dispersal, { from: account });
  }

  // Voting
  /**
   * @dev Allows sender to vote
   * @param _voteAddress Address of party who is being voted for (0 for reject option)
   * @param _voteAmount Amount of tokens to stake to the _voteAddress side
   */
  async vote(address, amount) {
    const instance = await this.contract.deployed();
    const [account] = await this.web3.eth.getAccounts();
    return instance.vote(address, this.web3.utils.toBN(amount), { from: account });
  }

  /**
   * @notice Returns the current winner
   */
  async getWinner() {
    const instance = await this.contract.deployed();
    const [account] = await this.web3.eth.getAccounts();
    return instance.getWinner({ from: account });
  }

  /**
   * @notice Returns the current winner and next best minority party
   */
  async getWinnerAndBestMinorty() {
    const instance = await this.contract.deployed();
    const [account] = await this.web3.eth.getAccounts();
    return instance.getWinnerAndBestMinorty({ from: account });
  }


  // Withdrawals
  /**
   * @dev Once a contract has been agreed withdrawals dispersal amount
   */
  async withdrawDispersal() {
    const instance = await this.contract.deployed();
    const [account] = await this.web3.eth.getAccounts();
    return instance.withdrawDispersal({ from: account });
  }

  /**
   * @dev Allows sender (party) to claim their dispersal tokens
   */
  async payoutParty() {
    const instance = await this.contract.deployed();
    const [account] = await this.web3.eth.getAccounts();
    return instance.payoutParty({ from: account });
  }

  /**
   * @dev Allows sender (voter) to claim their staked and reward tokens
   * @param _start Index at which to start iterating through votes
   * @param _end Index at which to end iterating through votes
   */
  async payoutVoter(start, end) {
    if (typeof start === 'undefined') start = 0;
    if (typeof end === 'undefined') end = 999999;
    const instance = await this.contract.deployed();
    const [account] = await this.web3.eth.getAccounts();
    return instance.payoutVoter(start, end, { from: account });
  }
  

  /**
   * @dev Returns a state for vote to be claimed
   * 0: now is before disputeEnd + vote_lookup
   * 1: ok! Reward is claimable
   * 2: reward is already claimed!
   * @param _start Index at which to start iterating through votes
   * @param _end Index at which to end iterating through votes
   */
  async canClaimReward(start, end) {
    if (typeof start === 'undefined') start = 0;
    if (typeof end === 'undefined') end = 999999;
    const instance = await this.contract.deployed();
    const [account] = await this.web3.eth.getAccounts();
    return instance.canClaimReward(start, end, { from: account });
  }

  /**
   * @dev Returns a bool if can withdraw and the amount of withdraw
   */
  async canWithdraw() {
    const instance = await this.contract.deployed();
    const [account] = await this.web3.eth.getAccounts();
    return instance.canWithdraw({ from: account });
  }   

  async VoterPayout() {
    const instance = await this.contract.deployed();
    const [account] = await this.web3.eth.getAccounts();
    return instance.VoterPayout({ from: account });
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
