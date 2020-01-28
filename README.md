![Jur](/logo.png)

#The Oath Keeper
Jur's smart contract enabling any Jur token holder to voluntarily self lock their tokens for a period of their choice.
The Oath Keeper does not provide any reward for it.

## Running and Testing the project
```
git clone https://github.com/jurteam/oath-keeper-smart-contract.git
cd oath-keeper-smart-contract
npm install
truffle compile
truffle test
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

## Functions
### 1. Adding an oath
```
takeAnOath(uint _lockInPeriod)
```
Any JUR token holder can give allowance to the Oath Keeper for the amount of tokens they want to lock and then call this
function to lock the tokens for a chosen time period. One address can only lock the tokens once.
1. **_lockInPeriod** - Number of months (integer) to lock the tokens for

### 2. Releasing an oath
```
releaseOath()
```
Once the lock-in period is over, the owner of the locked tokens can call this function to release the tokens from the oath
and receive them in their designated address.

### 3. Renege
```
renege(address _promisee, uint _newRelease)
```
In case, the token holder wants to unlock their token before time or want to extend their release date, the Jur owner of the
contract can do it on their behalf.
1. **_promisee** - The address of the token holder, to change the release date for.
2. **_newRelease** - The UNIX timestamp of the new release date and time.
