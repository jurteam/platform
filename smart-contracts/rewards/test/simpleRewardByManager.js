const assertFail = require("./helpers/assertFail");
const JurReward = artifacts.require("./mock/JurRewardsMock.sol");
const JurRole = artifacts.require("./mock/JurRoleMock.sol");
const ERC20 = artifacts.require("./mock/JURTokenMock.sol");
const { increaseTime } = require("./helpers/utils");

contract("Simple reward - By a manager", function (accounts) {
  var token;
  var jurRewards;
  var jurRole;
  var jurAdmin = accounts[1];
  var jurManager1 = accounts[2];
  var jurManager2 = accounts[3];
  var rewardee1 = accounts[4];
  var rewardee2 = accounts[5];
  var walletBalance = 5000;

  // =========================================================================
  it("1. Contract should be set properly", async () => {
    token = await ERC20.new({ from: accounts[0] });

    //Mint some tokens for the rewarding
    await token.mint(jurManager1, walletBalance, { from: accounts[0] });
    await token.mint(jurManager2, walletBalance, { from: accounts[0] });

    //Initialise the role and reward contracts
    jurRole = await JurRole.new({ from: jurAdmin });
    console.log("Jur Role contract address: ", jurRole.address);
    jurRewards = await JurReward.new(token.address, {
      from: jurAdmin,
    });

    assert.equal(await jurRewards.jurToken.call(), token.address);
  });

  it("2. Manager should not be able to create an activity without depositing tokens first", async () => {
    await jurRewards.updateManager(jurManager1, true, { from: jurAdmin });

    await assertFail(async () => {
      await jurRewards.addActivity("Get Schwifty", 5, 1000, [], {
        from: jurManager1,
      });
    });
  });

  it("3. Activity is created.", async () => {
    await token.approve(jurRewards.address, 500, { from: jurManager1 });
    await jurRewards.addActivity("Wubba lubba dub dub", 5, 100, [], {
      from: jurManager1,
    });

    const details = await jurRewards.activities(0);
    assert.equal(details.slotCount.toNumber(), 5);
    assert.equal(details.rewardAmount.toNumber(), 100);
    assert.equal(details.slotAssigned.toNumber(), 0);
    assert.equal(details.isActive, true);
    assert.equal(details.funder, jurManager1);
  });

  it("4. Manager should  able to create an activity with no reward amount", async () => {
    await jurRewards.updateManager(jurManager1, true, { from: jurAdmin });
    await jurRewards.addActivity("Get Schwifty", 5, 0, [], {
      from: jurManager1,
    });
    const details = await jurRewards.activities(1);
    assert.equal(details.slotCount.toNumber(), 5);
    assert.equal(details.rewardAmount.toNumber(), 0);
    assert.equal(details.slotAssigned.toNumber(), 0);
    assert.equal(details.isActive, true);
    assert.equal(details.funder, jurManager1);
  });

  it("5. Global balances should get updated properly", async () => {
    const activityBalance = await jurRewards.activityBalance();
    assert.equal(activityBalance.toNumber(), 500);
    assert.equal((await token.balanceOf(jurRewards.address)).toNumber(), 500);
  });

  it("6. Any user other than Manager should not be able to add activity.", async () => {
    jurRewards.updateManager(jurManager1, false, { from: jurAdmin });
    await token.approve(jurRewards.address, 500, { from: jurManager1 });

    await assertFail(async () => {
      await jurRewards.addActivity(
        "Find the parallel universe where Hitler cured Cancer",
        5,
        100,
        [],
        {
          from: jurManager1,
        }
      );
    });
  });

  it("7. Should not be able to create more than 50 slots.", async () => {
    jurRewards.updateManager(jurManager2, true, { from: jurAdmin });

    await assertFail(async () => {
      await jurRewards.addActivity("Develop an app", 51, 1000, [], {
        from: jurManager2,
      });
    });
  });

  it("8. Slot should get created properly.", async () => {
    let current = await jurRewards.getNow();
    await jurRewards.assignSlot(0, rewardee1, current + 1000, {
      from: jurManager2,
    });

    const details = await jurRewards.slots(0, 0);
    assert.equal(details.state.toNumber(), 0);
    assert.equal(details.assignedTo, rewardee1);
    assert.equal(details.activityId, 0);
    assert.equal(details.id, 0);
    assert.equal(details.dueDate, current + 1000);
  });

  it("9. Should not be able to assign a slot when the activity is inactive.", async () => {
    let current = await jurRewards.getNow();
    await jurRewards.changeActivityState(0, false, { from: jurManager2 });

    await assertFail(async () => {
      await jurRewards.assignSlot(0, rewardee1, current + 1000, {
        from: jurManager2,
      });
    });
  });

  it("10. Manager should be able to mark a slot sucessful.", async () => {
    await jurRewards.markSlotComplete(0, 0, { from: jurManager2 });
    let balance = await token.balanceOf(rewardee1);
    const details = await jurRewards.slots(0, 0);

    assert.equal(details.state.toNumber(), 2);
    assert.equal(balance.toNumber(), 100);
  });

  it("11. Should update all reward stats", async () => {
    let current = await jurRewards.getNow();
    await token.approve(jurRewards.address, 1000, { from: jurManager2 });
    await jurRewards.addActivity("Get Schwifty", 1, 1000, [], {
      from: jurManager2,
    });
    await jurRewards.assignSlot(2, rewardee2, current + 1000, {
      from: jurManager2,
    });
    await increaseTime(current, 1000);
    await jurRewards.markSlotComplete(2, 0, { from: jurManager2 });
    const stats = await jurRewards.rewardeeStats(rewardee2);
    const reward = await jurRewards.rewards(rewardee2, 0);

    assert.equal(stats.rewardCount.toNumber(), 1);
    assert.equal(stats.amountRewarded.toNumber(), 1000);
    assert.equal(reward.activityId.toNumber(), 2);
    assert.equal(reward.slotId.toNumber(), 0);
    assert.equal(reward.rewardAmount.toNumber(), 1000);
  });
});
