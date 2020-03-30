![Jur](/logo.png)

# The Oath Keeper
Jur's smart contract enabling any Jur token holder to voluntarily self lock their tokens for a period of their choice.
The Oath Keeper does not provide any reward for it.

## Running and Testing the project
```
git clone https://github.com/jurteam/oath-keeper-smart-contract.git
cd oath-keeper-smart-contract
npm install
truffle compile
truffle test --network <network-to-test-on>
```
> **Prerequisite :** Please install truffle by running,
```
npm install -g truffle
```

## Deployment
```
constructor(address _jurToken)
```
The address used to deploy the contract **OathKeeper.sol** automatically becomes the owner/admin of the contract.
1. **_jurToken** - The JUR Token address

## Write methods
### 1. Adding an oath
```
takeAnOath(uint _lockInPeriod)
```
Any JUR token holder can give allowance to the Oath Keeper for the amount of tokens they want to lock and then call this
function to lock the tokens for a chosen time period. One address can only lock the tokens multiple times.
1. **_lockInPeriod** - Number of months (integer) to lock the tokens for

### 2. Releasing an oath
```
releaseOath(uint _id)
```
Once the lock-in period is over, the owner of the locked tokens can call this function to release the tokens from the oath
and receive them in their designated address by providing the array index of the oath related to the address.

### 3. Updating minimum and maximum lock-in duration requirements
```
updateLockPeriod(uint _minimumLockPeriod, uint _maximumLockPeriod) 
```
The owner of the contract can update the minimum and maximum lock-in duration requirements of the contract. This is set in terms of months. The default values are 1 to 36 months.

## Read-only methods
### 1. lockMap(address, id)
Returns the details of an Oath. One address is allowed to take multiple oaths which can be accessed using the __id__. The details include the __amount__, __startAt__ , __releaseAt__, __lockInPeriod__, and __isOathFulfilled__ indicating the boolean status of the oath.

### 2. oathStats(address)
Returns the overall stats for a single address. These stats include __count__ (total number of oaths taken by the address), __activeAmountLocked__ and the __totalAmountLocked__ by the address.

### 3. totalLockedTokens
Returns the total number of tokens ever locked in the contract cumulatively since the time of deployment.

### 4. totalActiveLockedTokens
Returns the total number tokens currently locked in the contract culumatively.

### 5. totalOathCount
Returns the total number of oaths taken in the contract cumulatively since the time of deployment.

### 6. totalActiveOathCount
Returns the total number of oaths currently active in the contract.
