![Jur](/logo.png)
# Jur Status
Smart contracts implementing the Jur Status for authenticating the licence of a member in the Jur ecosystem. A licenced Jur Status will get access to Jur's exclusive features and activities and get rewarded for maintaining an active community.
The term Jur Status and the license is used interchangeably.
## Running and Testing the project
```
git clone https://github.com/jurteam/jur-status-smart-contract.git
cd jur-status-smart-contract
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
constructor()
```
The address used to deploy the contract **JurStatus.sol** automatically becomes the owner/admin of the contract.

## Functions
### 1. Adding a new status type
```
addStatusType(string _statusType)
```
Currently, Jur offers two types of licenses (enabling different sets of features), "Solomon" and "Justinian". The admin of the smart contract is required to officially add these types in the system.
Unless added, they cannot be associated with any of the statuses.

### 2. Granting a new license
```
addJurStatus(address _statusHolder, uint _statusType)
```
To grant a new license, the admin should use this function.
1. **_statusHolder** is the address which will be given the license.
2. **_statusType** is the index of the type to be used from the "statusTypes" array.

### 3. Invalidating a license
```
changeState(address _statusHolder, bool _newState)
```
A license can be invalidated by the Jur admin at any point as they see fit. Admin should call this function to invalidate it. By invalidating, only the "isActive" state of the license will change.
But it's record on the blockchain will always remain unchanged. Admin can also reinstate by license by using the same function.
1. **_statusHolder** is the address of the Jur Status holder.
2. **_newState** is the boolean state the admin wishes to impose on the Jur Status


### 4. Upgrading/Downgrading a licence
```
changeStatusType(address _statusHolder, uint _newStatusType)
```
A license can be upgraded or downgraded by the Jur admin at any point as they see fit. Admin should call this function to do so. By invalidating, only the "statusType" of the license will change.
But it's record on the blockchain will always remain unchanged.
1. **_statusHolder** is the address of the Jur Status holder.
2. **_newStatusType** is the index of the type to be used from the "statusTypes" array.



# Jur Status on the test network

#### Address - [0x7d6a130ace2271e23ce6d5527647ecb81fa72aea](https://explore-testnet.vechain.org/accounts/0x7d6a130ace2271e23ce6d5527647ecb81fa72aea)

NOTE: The bool field for `changeState` is read incorrectly by the inspector app as of June 20'. Please use other mediums to interact with the contract for this specific function only.





