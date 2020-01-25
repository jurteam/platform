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

  it("2. Promisees whould be able to pledge.", async () => {

    await token.approve(oathKeeper.address, 100, {from: promisee1});

    await oathKeeper.takeAnOath(5, {from: promisee1});
    const details = await otc.vestingMap(promisee1);

    assert.equal(details.amount.toNumber(), 100);
  });

  it("3. Single promisee cannot pledge twice", async () => {

    await assertFail(async () => {
        await oathKeeper.takeAnOath(5, {from: promisee1});
    });
  });

  it("4. Direct fund transfers should fail", async () => {
    
    await assertFail(async () => {
        await token.transfer(oathKeeper.address, 100, {from: promisee2});
    });
  })

});