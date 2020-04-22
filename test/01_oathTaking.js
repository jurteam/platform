const assertFail = require("./helpers/assertFail");
const OathKeeper = artifacts.require("./OathKeeperMock.sol");
const ERC20 = artifacts.require("./mock/JURTokenMock.sol");

contract('Oath Keeping - Taking an oath', function (accounts) {

  var token;
  var oathKeeper;
  var jurAdmin = accounts[1];
  var promisee1 = accounts[2];
  var promisee2 = accounts[3];
  var walletBalance = 1000;

  // =========================================================================
  it("1. Contract should be set properly", async () => {

    token = await ERC20.new({from: accounts[0]});

    //Mint some tokens for the promisees
    await token.mint(promisee1, walletBalance, {from: accounts[0]});
    await token.mint(promisee2, walletBalance, {from: accounts[0]});

    //Initialise the oath keeper
    oathKeeper = await OathKeeper.new(token.address, {from: jurAdmin});

    assert.equal(await oathKeeper.jurToken.call(), token.address);
    assert.equal(await oathKeeper.owner.call(), jurAdmin);
  });

  it("2. Promisees should be able to lock tokens after approving token transfer.", async () => {

    await token.approve(oathKeeper.address, 100, {from: promisee1});

    await oathKeeper.takeAnOath(10, {from: promisee1});
    const details = await oathKeeper.lockMap(promisee1, 1);

    assert.equal(details.amount.toNumber(), 100);
  });

  it("3. Promisees should not be able to lock tokens without approving token transfer.", async () => {

    await assertFail(async () => {
      await oathKeeper.takeAnOath(5, {from: promisee1});
    });
  });

  it("4. Single promisee should be able to pledge multiple times", async () => {

    await token.approve(oathKeeper.address, 100, {from: promisee1});

    await oathKeeper.takeAnOath(10, {from: promisee1});
    const details = await oathKeeper.lockMap(promisee1, 2);

    assert.equal(details.amount.toNumber(), 100);
  });

  it("5. LockSchedule details should be updated after a pledge.", async () => {

    await token.approve(oathKeeper.address, 100, {from: promisee2});

    await oathKeeper.takeAnOath(20, {from: promisee2});
    const details = await oathKeeper.lockMap(promisee2, 1);

    assert.equal(details.amount.toNumber(), 100);
    assert.equal(details.lockInPeriod.toNumber(), 20);
    assert.equal(details.isOathFulfilled, false);
  });

  it("6. Oath stats for the user should be updated after a pledge.", async () => {

    await token.approve(oathKeeper.address, 100, {from: promisee2});

    await oathKeeper.takeAnOath(20, {from: promisee2});
    const details = await oathKeeper.oathStats(promisee2);

    assert.equal(details.count.toNumber(), 2);
    assert.equal(details.activeAmountLocked.toNumber(), 200);
    assert.equal(details.totalAmountLocked.toNumber(), 200);
  });

  // it("7. Contract's overall stats should be updated after a pledge.", async () => {

  //   await token.approve(oathKeeper.address, 100, {from: promisee1});

  //   await oathKeeper.takeAnOath(20, {from: promisee1});

  //   assert.equal(await oathKeeper.totalLockedTokens.call(), 500);
  //   assert.equal(await oathKeeper.totalActiveLockedTokens.call(), 500);
  //   assert.equal(await oathKeeper.totalOathCount.call(), 5);
  //   assert.equal(await oathKeeper.totalActiveOathCount.call(), 5);
  // });

  it("8. Promisees should not be able to lock tokens outside of minimum and maximum lock period.", async () => {

    await assertFail(async () => {
      await oathKeeper.takeAnOath(56, {from: promisee1});
    });
  });

});