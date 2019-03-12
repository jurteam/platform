const assertFail = require("./helpers/assertFail");

const JURToken = artifacts.require("./JURToken.sol");

contract('Mint Token - Add fundings', function (accounts) {

  var token;
  var party1 = accounts[1];
  var party2 = accounts[2];
  var voter1 = accounts[3];

  // =========================================================================
  it("0. mint token funds", async () => {

    // token = await JURToken.new(["sig1"], {from: accounts[0]});
    token = await JURToken.at("0x49ab97dd2acfdd39d59775bafd5c406424b9f1b6", {from: accounts[0]});
    console.log("JUR Token Address: ", token.address);

    //Mint some tokens for party1 and party2
    await token.mint(party1, 14352, {from: accounts[0]});
    await token.mint(party2, 100, {from: accounts[0]});
    await token.mint(voter1, 100, {from: accounts[0]});

  });
});
