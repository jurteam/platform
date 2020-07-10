![Jur](/logo.png)
# Jur  Advocates
Smart contracts implementing the Jur Advocates for authenticating the licence of a member in the Jur ecosystem. A licenced Jur Advocate will get access to Jur's exclusive features and activities and get rewarded for maintaining an active community.
The term Jur Advocate and the license is used interchangeably.
## Running and Testing the project
```
git clone https://github.com/jurteam/advocate.git
cd advocate
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
The address used to deploy the contract **JurAdvocate.sol** automatically becomes the owner/admin of the contract.

## Functions
### 1. Adding a new advocate type
```
addAdvocateType(string _advocateType)
```
Currently, Jur offers two types of licenses (enabling different sets of features), "Solomon" and "Justinian". The admin of the smart contract is required to officially add these types in the system.
Unless added, they cannot be associated with any of the advocates.

### 2. Adding a new Advocate
```
addJurAdvocate(address _wallet, uint256 _advocateType)
```
To grant a new license, the admin should use this function.
1. **_wallet** is the address which will be given the license.
2. **_advocateType** is the index of the type to be used from the "advocateTypes" array.

### 3. Invalidating an Advocate
```
changeState(address _wallet, bool _newState)
```
A license can be invalidated by the Jur admin at any point as they see fit. Admin should call this function to invalidate it. By invalidating, only the "isActive" state of the license will change.
But it's record on the blockchain will always remain unchanged. Admin can also reinstate by license by using the same function.
1. **_wallet** is the address of the Jur Advocate holder.
2. **_newState** is the boolean state the admin wishes to impose on the Jur Advocate


### 4. Changing Advocate type
```
changeAdvocateType(address _wallet, uint256 _advocateType)
```
A license can be upgraded or downgraded by the Jur admin at any point as they see fit. Admin should call this function to do so. By invalidating, only the "advocateType" of the license will change.
But it's record on the blockchain will always remain unchanged.
1. **_wallet** is the address of the Jur Advocate holder.
2. **_advocateType** is the index of the type to be used from the "advocateTypes" array.



# Jur Advocate on the test network

#### Address - [0x79481d8933832e63BE499beADdcd49ac9a809FEF](https://explore-testnet.vechain.org/accounts/0x79481d8933832e63BE499beADdcd49ac9a809FEF)

NOTE: The bool field for `changeState` is read incorrectly by the inspector app as of June 20'. Please use other mediums to interact with the contract for this specific function only.





