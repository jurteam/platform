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
  var rewardee2 = accounts[5];
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

    assert.equal(await jurRewards.jurToken.call(), token.address);
  });

  it("2. Manager should  create an activity ", async () => {
    await jurRewards.updateManager(jurManager1, true, { from: jurAdmin });
    await token.approve(jurRewards.address, 500, { from: jurManager1 });
    await jurRewards.addActivity("Get Schwifty", 5, 100, [], {
      from: jurManager1,
    });

    const details = await jurRewards.activities(0);
    assert.equal(details.slotCount.toNumber(), 5);
    assert.equal(details.rewardAmount.toNumber(), 100);
    assert.equal(details.slotAssigned.toNumber(), 0);
    assert.equal(details.isActive, true);
    assert.equal(details.funder, jurManager1);
  });

  it("3. Slot should get created properly.", async () => {
    let current = (await jurRewards.getNow()).toNumber();
    await jurRewards.assignSlot(0, rewardee1, current + 1000, {
      from: jurManager1,
    });

    const details = await jurRewards.slots(0, 0);
    assert.equal(details.state.toNumber(), 0);
    assert.equal(details.assignedTo, rewardee1);
    assert.equal(details.activityId, 0);
    assert.equal(details.id, 0);
    assert.equal(details.dueDate.toNumber(), current + 1000);
  });

  it("4. User should not be able to mark complete before designated time", async () => {
    await assertFail(async () => {
      await jurRewards.markSlotComplete(0, 0, { from: rewardee1 });
    });
  });

  it("5. User should  be able to mark complete after designated time", async () => {
    const slot = await jurRewards.slots(0, 0);
    let current = (await jurRewards.getNow()).toNumber();
    let secondsToIncrease = slot.dueDate.toNumber() + 1000 - current;
    await increaseTime(current, secondsToIncrease);

    await jurRewards.markSlotComplete(0, 0, { from: rewardee1 });
    const details = await jurRewards.slots(0, 0);
    assert.equal(details.state.toNumber(), 1);
  });

  it("6. User should not be able to withdraw before designated time", async () => {
    await assertFail(async () => {
      await jurRewards.withdrawReward(0, 0, { from: rewardee1 });
    });
  });

  it("7. User should be able to withdraw after designated time", async () => {
    const slot = await jurRewards.slots(0, 0);
    let current = (await jurRewards.getNow()).toNumber();
    let secondsToIncrease =
      slot.dueDate.toNumber() + 7 * 24 * 60 * 60 - current;
    await increaseTime(current, secondsToIncrease);

    await jurRewards.withdrawReward(0, 0, { from: rewardee1 });
    const details = await jurRewards.slots(0, 0);
    assert.equal(details.state.toNumber(), 2);
    assert.equal((await token.balanceOf(rewardee1)).toNumber(), 100);
  });
});
