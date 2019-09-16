const assertFail = require("./helpers/assertFail");

const JURToken = artifacts.require("./JURToken.sol");

contract('Mint Token - Add fundings', function (accounts) {

  var token;
  var party0 = "0x7567d83b7b8d80addcb281a71d54fc7b3364ffed";
  var party1 = "0xd3ae78222beadb038203be21ed5ce7c9b1bff602";
  var party2 = "0x115eabb4f62973d0dba138ab7df5c0375ec87256";
  var voter1 = "0x733b7269443c70de16bbf9b0615307884bcc5636";

  console.log("Available accounts", accounts);

  // =========================================================================
  it("0. mint token funds", async () => {

    // token = await JURToken.new(["sig1"], {from: party0});
    token = await JURToken.at("0x45219ce53baa46097be46c1f3f0a0cc5e2b27891", {from: party0});
    console.log("JUR Token Address: ", token.address);

    //Mint some tokens for party1 and party2
    await token.mint(party0, 1221800000000000000000, {from: party0});
    await token.mint(party1, 1222800000000000000000, {from: party0});
    await token.mint(party2, 1223800000000000000000, {from: party0});
    await token.mint(voter1, 1224800000000000000000, {from: party0});

  });
});
