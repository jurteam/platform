const assertFail = require("./helpers/assertFail");

const JURToken = artifacts.require("./JURToken.sol");

contract('Mint Token - Add fundings', function (accounts) {

  var token;
  var party0 = "0xF23aFdA892Cf25F498B6aFc9a07c08DA194dFE12";
  var party1 = "0xdab6AbeF495D2eeE6E4C40174c3b52D3Bc9616A7";
  var party2 = accounts[2];
  var voter1 = accounts[3];

  // =========================================================================
  it("0. mint token funds", async () => {

    // token = await JURToken.new(["sig1"], {from: accounts[0]});
    token = await JURToken.at("0x49ab97dd2acfdd39d59775bafd5c406424b9f1b6", {from: accounts[0]});
    console.log("JUR Token Address: ", token.address);

    //Mint some tokens for party1 and party2
    await token.mint(party0, 82348970000000000000000, {from: accounts[0]});
    await token.mint(party1, 1435220000000000000000, {from: accounts[0]});
    await token.mint(party2, 8711940000000000000000, {from: accounts[0]});
    await token.mint(voter1, 10010000000000000000, {from: accounts[0]});

  });
});
