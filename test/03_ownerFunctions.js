const assertFail = require("./helpers/assertFail");

const OathKeeper = artifacts.require("./OathKeeper.sol");
  
const ERC20 = artifacts.require("./mock/JURTokenMock.sol");
  
contract('Oath Keeping - Owner functions', function (accounts) {
  
    var token;
    var oathKeeper;
    var jurAdmin = accounts[1];
  
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
});