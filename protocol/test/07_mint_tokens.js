const assertFail = require("./helpers/assertFail");

const JURToken = artifacts.require("./JURToken.sol");

contract('Mint Token - Add fundings', function (accounts) {

  var token;
  var party0 = accounts[0];
  var party1 = accounts[1];
  var party2 = accounts[2];
  var voter1 = accounts[3];

  // =========================================================================
  it("0. mint token funds", async () => {

    // token = await JURToken.new(["sig1"], {from: accounts[0]});
    token = await JURToken.at("0x4cced9a56c0758f330ca4ae3342946b79b8eed11", {from: accounts[0]});
    console.log("JUR Token Address: ", token.address);

    //Mint some tokens for party1 and party2
    await token.mint(party0, 2348970000000000000000, {from: accounts[0]});
    await token.mint(party1, 1435220000000000000000, {from: accounts[0]});
    await token.mint(party2, 8711940000000000000000, {from: accounts[0]});
    await token.mint(voter1, 10010000000000000000, {from: accounts[0]});

  });
});
