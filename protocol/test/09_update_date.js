const assertFail = require("./helpers/assertFail");

const ArbitrationFactory = artifacts.require("./ArbitrationFactoryMock.sol");
const Arbitration = artifacts.require("./ArbitrationMock.sol");
const JURToken = artifacts.require("./JURToken.sol");

//signJUR(address _sender)
//proposeAmendmentJUR(address _sender, uint256[] _dispersal, uint256[] _funding, bytes32 _agreementHash)
//agreeAmendmentJUR(address _sender)
//disputeJUR(address _sender, uint256 _voteAmount, uint256[] _dispersal)
//voteJUR(address _sender, address _voteAddress, uint256 _voteAmount)

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")) // Hardcoded development port

let signJURFunction = {
  name: 'signJUR',
  type: 'function',
  inputs: [{
      type: 'address',
      name: '_sender'
    }]
};
let signJUR = web3.eth.abi.encodeFunctionSignature(signJURFunction);

let proposeAmendmentJURFunction = {
  name: 'proposeAmendmentJUR',
  type: 'function',
  inputs: [{
      type: 'address',
      name: '_sender'
    },{
      type: 'uint256[]',
      name: '_dispersal'
    },{
      type: 'uint256[]',
      name: '_funding'
    },{
      type: 'bytes32',
      name: '_agreementHash'
    }]
};
let proposeAmendmentJUR = web3.eth.abi.encodeFunctionSignature(proposeAmendmentJURFunction);

let agreeAmendmentJURFunction = {
  name: 'agreeAmendmentJUR',
  type: 'function',
  inputs: [{
      type: 'address',
      name: '_sender'
    }]
};
let agreeAmendmentJUR = web3.eth.abi.encodeFunctionSignature(agreeAmendmentJURFunction);

let disputeJURFunction = {
  name: 'disputeJUR',
  type: 'function',
  inputs: [{
      type: 'address',
      name: '_sender'
    },{
      type: 'uint256',
      name: '_voteAmount'
    },{
      type: 'uint256[]',
      name: '_dispersal'
    }]
};
let disputeJUR = web3.eth.abi.encodeFunctionSignature(disputeJURFunction);

let voteJURFunction = {
  name: 'voteJUR',
  type: 'function',
  inputs: [{
      type: 'address',
      name: '_sender'
    },{
      type: 'address',
      name: '_voteAddress'
    },{
      type: 'uint256',
      name: '_voteAmount'
    }]
};
let voteJUR = web3.eth.abi.encodeFunctionSignature(voteJURFunction);

contract('Arbitration - Create and update date', function (accounts) {

  var token;
  var arbitrationFactory;
  var arbitration;
  var party1 = "0x7567d83b7b8d80addcb281a71d54fc7b3364ffed";
  var party2 = "0xd3ae78222beadb038203be21ed5ce7c9b1bff602";
  var voter1 = accounts[3];
  var voter2 = accounts[4];
  var voter3 = accounts[5];
  var voter4 = accounts[6];

  // =========================================================================
  it("0. initialize token contract and arbitration factory contract", async () => {

    token = await JURToken.at("0xe7ba600a074aa7fb9eb65a333b5d32bb1a5fbda6", {from: party1});
    console.log("JUR Token Address: ", token.address);

    //Initialise arbitration contract
    arbitrationFactory = await ArbitrationFactory.new(token.address, {from: party1});
    console.log("Arbitration Factory Address: ", arbitrationFactory.address);

  });

  it("1. create new arbitration - state is unsigned", async () => {
    let tx = await arbitrationFactory.createArbitration([party1, party2], [0, 100], [80, 20], "Do some work...");
    arbitration = Arbitration.at(tx.logs[0].args._arbitration);
    console.log("Arbitration Address: " + arbitration.address);
  });

  it("4. party1 signs arbitration", async () => {
    let data = web3.eth.abi.encodeFunctionCall(signJURFunction, [party1]);
    await token.approveAndCall(arbitration.address, 80, data, {from: party1});
  });

  it("5. party2 signs arbitration - state is now Signed", async () => {
    let data = web3.eth.abi.encodeFunctionCall(signJURFunction, [party2]);
    await token.approveAndCall(arbitration.address, 20, data, {from: party2});
    let state = await arbitration.state();
    assert.equal(state, 1);
  });

  it("6. party1 disputes arbitration with sufficient vote", async () => {
    await token.mint(party1, 10, {from: accounts[0]});
    let data = web3.eth.abi.encodeFunctionCall(disputeJURFunction, [party1, 10, [20, 80]]);
    await token.approveAndCall(arbitration.address, 10, data, {from: party1});
    let state = await arbitration.state();
    assert.equal(state, 3);
    assert.equal((await arbitration.totalVotes()).toNumber(), 10);
  });

  it("7. party2 sets their dispute dispersal", async () => {
    await arbitration.amendDisputeDispersal([0, 100], {from: party2});
    let state = await arbitration.state();
    assert.equal(state, 3);
  });

  it("8. change contract date", async () => {
    await arbitration.setMockedNow(1 * 24 * 60 * 60);
  });

  // it("9. start voting", async () => {
  //   let data = web3.eth.abi.encodeFunctionCall(voteJURFunction, [voter1, party2, 20]);
  //   await token.approveAndCall(arbitration.address, 100, data, {from: voter1});
  //   data = web3.eth.abi.encodeFunctionCall(voteJURFunction, [voter2, party1, 30]);
  //   await token.approveAndCall(arbitration.address, 30, data, {from: voter2});
  //   data = web3.eth.abi.encodeFunctionCall(voteJURFunction, [voter3, party2, 30]);
  //   await token.approveAndCall(arbitration.address, 30, data, {from: voter3});
  //   //Party1 has 40 votes, Party2 has 50 votes
  //   assert.equal((await arbitration.totalVotes()).toNumber(), 90);
  //   assert.equal((await arbitration.partyVotes(party1)).toNumber(), 40);
  //   assert.equal((await arbitration.partyVotes(party2)).toNumber(), 50);
  // });

  // it("10. unable to vote if ratio between new winner and second best is more than 2", async () => {
  //   await assertFail(async () => {
  //     await arbitration.vote(party2, 31, {from: voter4});
  //   });
  // });

  // it("11. dispute ends, no more voting possible", async () => {
  //   await arbitration.setMockedNow(9 * 24 * 60 * 60);
  //   await assertFail(async () => {
  //     await arbitration.vote(party1, 1, {from: voter2});
  //   });
  // });

  // it("12. voters receive rewards", async () => {
  //   let voter1Balance = await token.balanceOf(voter1);
  //   let voter2Balance = await token.balanceOf(voter2);
  //   let voter3Balance = await token.balanceOf(voter3);
  //   await arbitration.payoutVoter(0, 10, {from: voter1});
  //   await arbitration.payoutVoter(0, 10, {from: voter2});
  //   await arbitration.payoutVoter(0, 10, {from: voter3});
  //   let voter1FinalBalance = await token.balanceOf(voter1);
  //   let voter2FinalBalance = await token.balanceOf(voter2);
  //   let voter3FinalBalance = await token.balanceOf(voter3);
  //   //Voter1 gets 20 reward tokens, and their original 20 tokens
  //   //Voter2 loses their original 30 tokens
  //   //Voter3 gets 20 reward tokens, and their original 30 tokens
  //   assert.equal(voter1FinalBalance.sub(voter1Balance).toNumber(), 40);
  //   assert.equal(voter2FinalBalance.sub(voter2Balance).toNumber(), 0);
  //   assert.equal(voter3FinalBalance.sub(voter3Balance).toNumber(), 50);
  // });

  // it("13. parties receive payouts", async () => {
  //   let party1Balance = await token.balanceOf(party1);
  //   let party2Balance = await token.balanceOf(party2);
  //   await arbitration.payoutParty({from: party1});
  //   await arbitration.payoutParty({from: party2});
  //   await arbitration.payoutVoter(0, 10, {from: party1});
  //   await arbitration.payoutVoter(0, 10, {from: party2});
  //   let party1FinalBalance = await token.balanceOf(party1);
  //   let party2FinalBalance = await token.balanceOf(party2);
  //   //Party1 gets 25 dispersal tokens, and no reward tokens
  //   //Party2 gets 125 dispersal tokens, and no reward tokens
  //   assert.equal(party1FinalBalance.sub(party1Balance).toNumber(), 25);
  //   assert.equal(party2FinalBalance.sub(party2Balance).toNumber(), 125);
  // });

});
