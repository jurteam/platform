const JurStatus = artifacts.require("./JurStatus.sol");
const assertFail = require("./helpers/assertFail");

contract('JurStatus', function (accounts) {

  var jurStatus;
  var jurAdmin = accounts[0];
  var status1 = accounts[1];
  var status2 = accounts[2];
  var solomon = "Solomon";
  var justinian = "Justinian";

  // =========================================================================
  it("0. Initialize jur status contract. ", async () => {
    
    jurStatus = await JurStatus.new({from: jurAdmin});
    console.log("Jur Status contract address: ", jurStatus.address);

    assert.equal((await jurStatus.getStatusCount()).toNumber(), 0);
  });

  it("1. Let's the Jur admin add a state type. ", async () => {
    
    await jurStatus.addStatusType(solomon, {from: jurAdmin});
    assert.equal(await jurStatus.getStatusType(0), solomon);

    await jurStatus.addStatusType(justinian, {from: jurAdmin});
    assert.equal(await jurStatus.getStatusType(1), justinian);
  });

  it("2. Does not let's any address other than the Jur admin add a state type. ", async () => {
    
    await assertFail(async () => {
        await jurStatus.addStatusType(solomon, {from: accounts[4]});
    });
  });

  it("3. Let's the admin add a status. ", async () => {
    
    await jurStatus.addJurStatus(status1, 0, {from: jurAdmin});

    assert.equal((await jurStatus.getStatus(status1))[1], true);
    assert.equal((await jurStatus.statusList.call(0)).isActive, true);
    assert.equal((await jurStatus.getStatus(status1))[2], solomon);
    assert.equal((await jurStatus.statusList.call(0)).statusType, solomon);
  });

  it("4. Let's the admin change the active state of a status. ", async () => {
    
    await jurStatus.changeState(status1, false);
    assert.equal((await jurStatus.getStatus(status1))[1], false);
    assert.equal((await jurStatus.statusList.call(status1)).isActive, false);
  });

  it("4. Admin can change status type", async () => {
    
    await jurStatus.changeStatusType(status1, 1);
    assert.equal((await jurStatus.getStatus(status1))[1], justinian);
    assert.equal((await jurStatus.statusList.call(status1)).statusType, justinian);
  });

});