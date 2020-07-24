const assertFail = require("./helpers/assertFail");
const JurReward = artifacts.require("./mock/JurRewardsMock.sol");
const JurRole = artifacts.require("./mock/JurRoleMock.sol");
const ERC20 = artifacts.require("./mock/JURTokenMock.sol");
const { increaseTime } = require("./helpers/utils");

contract("Simple reward - By a User", function (accounts) {
  var token;
  var jurRewards;
  var jurRole;
  var jurAdmin = accounts[1];
  var jurManager1 = accounts[2];
  var rewardee1 = accounts[4];
  var walletBalance = 5000;

  // =========================================================================
  it("1. Contract should be set properly", async () => {
    token = await ERC20.new({ from: accounts[0] });

    //Mint some tokens for the rewarding
    await token.mint(jurManager1, walletBalance, { from: accounts[0] });

    //Initialise the role and reward contracts
    jurRole = await JurRole.new({ from: jurAdmin });
    console.log("Jur Role contract address: ", jurRole.address);
    jurRewards = await JurReward.new(token.address, {
      from: jurAdmin,
    });

    await jurRewards.updateManager(jurManager1, true, { from: jurAdmin });
    await token.approve(jurRewards.address, 500, { from: jurManager1 });
    await jurRewards.addActivity("Get Schwifty", 5, 100, [], {
      from: jurManager1,
    });

    let current = (await jurRewards.getNow()).toNumber();
    await jurRewards.assignSlot(0, rewardee1, current + 1000, {
      from: jurManager1,
    });
  });

  it("2. User should be able to mark complete", async () => {
    const slot = await jurRewards.slots(0, 0);
    let current = (await jurRewards.getNow()).toNumber();
    let secondsToIncrease = slot.dueDate.toNumber() + 1000 - current;
    await increaseTime(current, secondsToIncrease);

    await jurRewards.markSlotComplete(0, 0, { from: rewardee1 });
    const details = await jurRewards.slots(0, 0);
    assert.equal(details.state.toNumber(), 1);
  });

  it("3. Manager should not be able to Unassign if the state is Completed", async () => {
    const details = await jurRewards.slots(0, 0);
    assert.equal(details.state.toNumber(), 1);
    await assertFail(async () => {
      await jurRewards.unassignSlot(0, 0, { from: jurManager1 });
    });
  });

  it("4. Manager should not be able to Cancel if the state is Completed", async () => {
    await assertFail(async () => {
      await jurRewards.cancelSlot(0, 0, { from: jurManager1 });
    });
  });

  it("5. Manager should be able to mark a slot complete.", async () => {
    await jurRewards.markSlotComplete(0, 0, { from: jurManager1 });
    let balance = await token.balanceOf(rewardee1);
    const details = await jurRewards.slots(0, 0);

    assert.equal(details.state.toNumber(), 2);
    assert.equal(balance.toNumber(), 100);
    assert.equal((await jurRewards.activityBalance()).toNumber(), 400);
    assert.equal((await jurRewards.rewardedAmount()).toNumber(), 100);
  });

  it("6. Manager should be able to unassign if the state is not completed", async () => {
    await token.approve(jurRewards.address, 500, { from: jurManager1 });
    await jurRewards.addActivity("Get Schwifty", 5, 100, [], {
      from: jurManager1,
    });

    let current = (await jurRewards.getNow()).toNumber();
    await jurRewards.assignSlot(1, rewardee1, current + 1000, {
      from: jurManager1,
    });
    const slot = await jurRewards.slots(0, 0);
    let secondsToIncrease = slot.dueDate.toNumber() + 1000 - current;
    await increaseTime(current, secondsToIncrease);

    await jurRewards.unassignSlot(1, 0, { from: jurManager1 });
    const details = await jurRewards.slots(1, 0);

    assert.equal(details.state.toNumber(), 3);
    assert.equal(
      details.assignedTo,
      "0x0000000000000000000000000000000000000000"
    );
    assert.equal(details.activityId, 1);
    assert.equal(details.id, 0);
    assert.equal(details.dueDate.toNumber(), 0);
  });

  it("7. Manager should be able to Reassign if the state is Completed", async () => {
    let current = (await jurRewards.getNow()).toNumber();
    await jurRewards.reassignSlot(1, 0, rewardee1, current + 1000, {
      from: jurManager1,
    });
    const details = await jurRewards.slots(1, 0);

    assert.equal(details.state.toNumber(), 0);
    assert.equal(details.assignedTo, rewardee1);
    assert.equal(details.activityId, 1);
    assert.equal(details.id, 0);
    assert.equal(details.dueDate.toNumber(), current + 1000);
  });

  it("8. Manager should be able to Cancel and Assigned state", async () => {
    let initialBalance = (await token.balanceOf(jurManager1)).toNumber();
    await jurRewards.cancelSlot(1, 0, {
      from: jurManager1,
    });
    let updatedBalance = (await token.balanceOf(jurManager1)).toNumber();
    const details = await jurRewards.slots(1, 0);

    assert.equal(details.state.toNumber(), 4);
    assert.equal(updatedBalance - initialBalance, 100);
    assert.equal((await jurRewards.activityBalance()).toNumber(), 800);
    assert.equal((await jurRewards.rewardedAmount()).toNumber(), 100);
  });
});
