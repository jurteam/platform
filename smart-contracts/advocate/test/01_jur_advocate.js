const JurAdvocate = artifacts.require("./JurAdvocate.sol");
const assertFail = require("./helpers/assertFail");

contract('JurAdvocate', function (accounts) {

  var jurAdvocate;
  var jurAdmin = accounts[0];
  var advocate1 = accounts[1];
  var advocate2 = accounts[2];
  var normal = "Normal";
  var alien = "Alien";

  // =========================================================================
  it("0. Initialize jur advocate contract. ", async () => {
    
    jurAdvocate = await JurAdvocate.new({from: jurAdmin});
    console.log("Jur Advocate contract address: ", jurAdvocate.address);

    assert.equal((await jurAdvocate.getAdvocateCount()).toNumber(), 0);
  });

  it("1. Let's the Jur admin add an advocate type. ", async () => {
    
    await jurAdvocate.addAdvocateType(normal, {from: jurAdmin});
    assert.equal(await jurAdvocate.getAdvocateType(0), normal);

    await jurAdvocate.addAdvocateType(alien, {from: jurAdmin});
    assert.equal(await jurAdvocate.getAdvocateType(1), alien);
  });

  it("2. Does not let's any address other than the Jur admin add an advocate type. ", async () => {
    
    await assertFail(async () => {
        await jurAdvocate.addAdvocateType(normal, {from: accounts[4]});
    });
  });

  it("3. Let's the admin add an advocate. ", async () => {
    
    await jurAdvocate.addJurAdvocate(advocate1, 0, {from: jurAdmin});

    assert.equal((await jurAdvocate.getAdvocate(advocate1))[1], true);
    assert.equal((await jurAdvocate.advocateList.call(0)).isActive, true);
    assert.equal((await jurAdvocate.getAdvocate(advocate1))[2], normal);
    assert.equal((await jurAdvocate.advocateList.call(0)).advocateType, normal);
  });

  it("4. Let's the admin change the active state of an advocate. ", async () => {
    
    await jurAdvocate.changeState(advocate1, false);
    assert.equal((await jurAdvocate.getAdvocate(advocate1))[1], false);
    assert.equal((await jurAdvocate.advocateList.call(advocate1)).isActive, false);
  });

  it("5. Admin can change advocate type", async () => {
    
    await jurAdvocate.changeAdvocateType(advocate1, 1);
    assert.equal((await jurAdvocate.getAdvocate(advocate1))[1], alien);
    assert.equal((await jurAdvocate.advocateList.call(advocate1)).advocateType, alien);
  });

});