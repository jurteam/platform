import contract from "truffle-contract";
// import toAsciiFromByte32 from "../utils/toAsciiFromByte32";

let arbitrationSCInstance = null;

export default class ArbitrationContract {
  constructor(address) {
    if (!arbitrationSCInstance) {
      arbitrationSCInstance = this;
      this.web3 = window.web3;
      this.contract = contract({
        ...global.drizzle.contracts[address],
        networks: { "5777": { address } }
      });
      this.contract.setProvider(this.web3.currentProvider);
    }

    // define easy access variables
    this.address = address;

    return arbitrationSCInstance;
  }

  // Helpers
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
    console.log("handleAcceptArbitration - Arbitration instance", instance);
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
