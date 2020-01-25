const assertFail = require("./helpers/assertFail");

const OathKeeper = artifacts.require("./OathKeeper.sol");

const ERC20 = artifacts.require("./mock/JURTokenMock.sol");

contract('Oath Keeping - Taking an oath', function (accounts) {

  var token;
  var oathKeeper;
  var jurAdmin = accounts[1];
  var promisee1 = accounts[2];
  var promisee2 = accounts[3];
  var walletBalance = 1000;

  // =========================================================================
  it("1. Tokens should not be released before the vesting time is over.", async () => {

    token = await ERC20.new({from: accounts[0]});

    //Mint some tokens for the promisees
    await token.mint(promisee1, walletBalance, {from: accounts[0]});
    await token.mint(promisee2, walletBalance, {from: accounts[0]});

    //Initialise the oath keeper
    oathKeeper = await OathKeeper.new(token.address, {from: jurAdmin});
    await token.approve(oathKeeper.address, 200, {from: promisee1});
    await oathKeeper.takeAnOath(2, {from: promisee1});
    await assertFail(async () => {
        await oathKeeper.releaseOath({from: promisee1});
    });
  });

  it("2. Tokens should release after vesting", async () => {

    await token.approve(oathKeeper.address, 200, {from: promisee2});
    await oathKeeper.takeAnOath(1, {from: promisee2});

    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    await timeout(60000);
    await oathKeeper.releaseOath({from: promisee2});

    assert.equal((await token.balanceOf(promisee2)).toNumber(), 1000);
    assert.equal((await oathKeeper.totalLockedTokens.call()).toNumber(), 100);
    assert.equal(await oathKeeper.vestingMap[promisee2].isOathFulfilled, true);
  });

  it("3. Admin should be able to change the release date", async() => {
    
    var _releaseAt = Math.round((new Date()).getTime() / 1000) + 1000;
    
    await oathKeeper.renege(promisee1, _releaseAt, {from: jurAdmin});

    assert.equal(await oathKeeper.vestingMap[promisee1].releaseAt, _releaseAt);

  })

});