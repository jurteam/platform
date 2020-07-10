const assertFail = require("./helpers/assertFail");
const JurReward = artifacts.require("./mock/JurRewardsMock.sol");
const JurRole = artifacts.require("./mock/JurRoleMock.sol");
const ERC20 = artifacts.require("./mock/JURTokenMock.sol");

contract("Jur Role Access", function (accounts) {
  var token;
  var jurRewards;
  var jurRoleStatus;
  var jurRoleAdvocate;
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
    jurRoleStatus = await JurRole.new({ from: jurAdmin });
    jurRoleAdvocate = await JurRole.new({ from: jurAdmin });
    console.log("Jur Role Status contract address: ", jurRoleStatus.address);
    console.log(
      "Jur Role Advocate contract address: ",
      jurRoleAdvocate.address
    );
    jurRewards = await JurReward.new(token.address, { from: jurAdmin });
  });

  it("2. Admin should be able to whitelist a contract ", async () => {
    await jurRewards.whitelistRoleContract(jurRoleStatus.address, true, {
      from: jurAdmin
    });

    assert(await jurRewards.whitelistedContracts(jurRoleStatus.address), true);
  });

  it("3. Whitelisted roles should be allowed while creating an activity ", async () => {
    await jurRewards.updateManager(jurManager1, true, { from: jurAdmin });
    await token.approve(jurRewards.address, 500, { from: jurManager1 });
    await jurRewards.addActivity(
      "Get Schwifty",
      5,
      100,
      [jurRoleStatus.address],
      {
        from: jurManager1
      }
    );

    const details = await jurRewards.activities(0);
    assert.equal(details.slotCount.toNumber(), 5);
    assert.equal(details.rewardAmount.toNumber(), 100);
    assert.equal(details.slotAssigned.toNumber(), 0);
    assert.equal(details.isActive, true);
    assert.equal(details.funder, jurManager1);
  });

  it("4. Roles not whitelisted whould not be allowed ", async () => {
    await assertFail(async () => {
      await jurRewards.addActivity(
        "Get Schwifty",
        5,
        100,
        [jurRoleStatus.address, jurRoleAdvocate.address],
        {
          from: jurManager1,
        }
      );
    });
  });

  it("5.User not a part of the role contract should not be assigned a role ", async () => {
    let current = await jurRewards.getNow();
    await assertFail(async () => {
      await jurRewards.assignSlot(0, rewardee1, current + 1000, {
        from: jurManager1,
      });
    });
  });

  it("6.User who is a part of the role contract should be assigned a slot ", async () => {
    let current = await jurRewards.getNow();
    await jurRoleStatus.addUser(rewardee1, { from: jurAdmin });
    await jurRewards.assignSlot(0, rewardee1, current + 1000, {
      from: jurManager1,
    });

    const details = await jurRewards.slots(0, 0);
    assert.equal(details.state.toNumber(), 0);
    assert.equal(details.assignedTo, rewardee1);
    assert.equal(details.activityId, 0);
    assert.equal(details.id, 0);
    assert.equal(details.dueDate, current + 1000);
  });

  it("7. Admin should be able to delist a role contract", async () => {
    await jurRewards.whitelistRoleContract(jurRoleStatus.address, false, {
      from: jurAdmin
    });

    assert.equal((await jurRewards.whitelistedContracts(jurRoleStatus.address)).isActive, false);
  });
});
