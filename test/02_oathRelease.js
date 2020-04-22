const assertFail = require("./helpers/assertFail");
const OathKeeper = artifacts.require("./OathKeeperMock.sol");
const ERC20 = artifacts.require("./mock/JURTokenMock.sol");
const { increaseTime } = require("./helpers/utils");

contract('Oath Keeping - Releasing an oath', function (accounts) {

  var token;
  var oathKeeper;
  var jurAdmin = accounts[1];
  var promisee1 = accounts[2];
  var promisee2 = accounts[3];
  var walletBalance = 1000;

  // =========================================================================
  it("1. Tokens should not be released before the lock-in time is over.", async () => {

    token = await ERC20.new({from: accounts[0]});

    //Mint some tokens for the promisees
    await token.mint(promisee1, walletBalance, {from: accounts[0]});
    await token.mint(promisee2, walletBalance, {from: accounts[0]});

    //Initialise the oath keeper
    oathKeeper = await OathKeeper.new(token.address, {from: jurAdmin});
    await token.approve(oathKeeper.address, 200, {from: promisee1});

    await oathKeeper.takeAnOath(11, {from: promisee1});
    await assertFail(async () => {
        await oathKeeper.releaseOath(1, {from: promisee1});
    });
  });

  it("2. Tokens should release after lock-in period is over.", async () => {

    await token.approve(oathKeeper.address, 200, {from: promisee2});
    await oathKeeper.takeAnOath(11, {from: promisee2});

    let current = await oathKeeper.getNow();
    let lockMap = await oathKeeper.lockMap(promisee2, 1);
    let secondsToIncrease = lockMap.releaseAt.toNumber() - current;
    await increaseTime(current, secondsToIncrease)
    await oathKeeper.releaseOath(1, { from: promisee2});

    assert.equal((await token.balanceOf(promisee2)).toNumber(), 1000);
  });

  it("3. Oath stats should change for a promisee after release", async () => {

    const details = await oathKeeper.oathStats(promisee2);

    assert.equal(details.count.toNumber(), 1);
    assert.equal(details.activeAmountLocked.toNumber(), 0);
    assert.equal(details.totalAmountLocked.toNumber(), 200);
  });

  // it("4. Overall contract stats should change after release", async () => {

  //   assert.equal((await oathKeeper.totalLockedTokens.call()).toNumber(), 400);
  //   assert.equal((await oathKeeper.totalActiveLockedTokens.call()).toNumber(), 200);
  //   assert.equal((await oathKeeper.totalOathCount.call()).toNumber(), 2);
  //   assert.equal((await oathKeeper.totalActiveOathCount.call()).toNumber(), 1);
  // });

  it("5. LockSchedule details should be updated after a release.", async () => {

    const details = await oathKeeper.lockMap(promisee2, 1);

    assert.equal(details.amount.toNumber(), 200);
    assert.equal(details.lockInPeriod.toNumber(), 11);
    assert.equal(details.isOathFulfilled, true);
  });

});