const assertFail = require("./helpers/assertFail");
const OathKeeper = artifacts.require("./OathKeeperMock.sol");
const ERC20 = artifacts.require("./mock/JURTokenMock.sol");
  
contract('Oath Keeping - Owner functions', function (accounts) {
  
    var token;
    var oathKeeper;
    var jurAdmin = accounts[1];
    var promisee1 = accounts[2];
  
    // =========================================================================
    it("1. Contract should be set properly", async () => {
    
        token = await ERC20.new({from: accounts[0]});
        
        //Initialise the oath keeper
        oathKeeper = await OathKeeper.new(token.address, {from: jurAdmin});
        
        assert.equal(await oathKeeper.jurToken.call(), token.address);
        assert.equal(await oathKeeper.owner.call(), jurAdmin);
    });

    it("2. Admin should be able to change the lock-in minimum time", async() => {
            
        await oathKeeper.updateLockPeriod(5, 0, {from: jurAdmin});

        assert(await oathKeeper.minimumLockPeriod.call(), 5);
    });

    it("3. Admin should be able to change the lock-in maximum time", async() => {
            
        await oathKeeper.updateLockPeriod(0, 90, {from: jurAdmin});

        assert(await oathKeeper.maximumLockPeriod.call(), 90);
    });

    it("4. Promisees should be able to lock tokens with new updated values", async () => {
        
        //Mint some tokens for the promisees
        await token.mint(promisee1, 100, {from: accounts[0]});
        await token.approve(oathKeeper.address, 100, {from: promisee1});
        await oathKeeper.takeAnOath(56, {from: promisee1});
        const details = await oathKeeper.lockMap(promisee1, 1);
    
        assert.equal(details.amount.toNumber(), 100);
      });
});