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
    token = await JURToken.at("0x3d94a27759513f3883e55583fbcd70ce912da1d2", {from: accounts[0]});
    console.log("JUR Token Address: ", token.address);

    //Mint some tokens for party1 and party2
    await token.mint(party0, 234897, {from: accounts[0]});
    await token.mint(party1, 143522, {from: accounts[0]});
    await token.mint(party2, 871194, {from: accounts[0]});
    await token.mint(voter1, 1001, {from: accounts[0]});

  });
});
