![Jur](/logo.png)
# Jur  Rewards
Smart contracts implementing the Jur Rewards. The goal of the Jur Rewards is to award various users in the Jur ecosystem
## Running and Testing the project
```
git clone https://github.com/jurteam/rewards.git
cd rewards
npm install
truffle compile
truffle test
```
> **Prerequisite:** Please install truffle by running,
```
npm install -g truffle
```
 
## Deployment
```
constructor(address _jurToken)
```
The address used to deploy the contract **JurRewards.sol** automatically becomes the owner/admin of the contract.
 
## Concept
- Jur Admin is responsible for adding or removing a Jur Manager(s). This will be decided offline and the Manager will be responsible for providing their address to the Admin after verifying that the private key has not been compromised in any way. Jur Manager(s) are authorized to perform activities related to the activities and rewards.
- Jur Managers are responsible for defining who will be able to access the activity and earn the reward. This is designed keeping in mind that Jur Rewards can be used to award activities organized by different Jur users like Advocates, Statuses, etc.
- Jur Admin is also responsible for interlinking different Jur-user (Advocates, Status, Oathkeeper) contracts to the Rewards contract.
For example, if an activity’s array for access tags include ‘Advocate’ and ‘Status’, then it will only be assigned to users who belong in the category. However, an empty array indicates that activity is open to all users.
- There can be any number of Jur Managers.
- All activities are discussed and planned offline. Their budget is authorized by Jur management and funds are made available to Jur Manager's accounts.
- Jur Manager will be responsible for adding and managing activities. An activity has properties like `id`, `activityName`, `rewardAmount`, `slotsAvailable`, `slotsAssigned`,
`isActive`, `funder`, `availableTo`.
- The minimum reward amount can be zero.
- An activity can be marked Active/Inactive by a Manager. However, the ongoing assigned slots in an inactive activity will be able to complete the process and get rewarded.
- Jur Manager will also be responsible for creating and assigning slots to users. Every slot further has the following parameters: `States (Unassigned, Assigned, Cancelled, Completed, Rewarded)`, `dueDate`, `createdAt`, `assignedTo`, `activityId`, `rewardId`.
- There is no restriction on the number of activities that can be added by a Manager. However, creating an activity will require the Manager to pre-approve the appropriate amount of JUR tokens required to fund the escrow.
- The Manager can also add extra slots to an already existing activity if required.
- All awards on Jur Rewards are tied to activity. There will be no mechanism to award without first tagging it to an activity.
- Users can choose to apply to an active activity offline. This transaction can be verified on the blockchain once the user gets assigned to an activity by the Manager in the contract.
- The Manager can also Unassign or Cancel a slot as long as it hasn’t been marked Completed by the user.
- The Manager can directly choose to reward an assigned slot. In this case, the slot will be directly moved to the ‘Rewarded’ state and the reward transfer will be initiated.
- Once a slot has reached past its due date, the rewardee can mark the slot ‘Completed’. This does not initiate the reward transfer just yet. But once a slot is marked ‘Completed’, JurManager cannot cancel or unassign it. The reward transfer can be initiated 7 days after the dueDate by the rewardee. By doing so, the state of the activity will change to ‘Rewarded’.
 
## Admin Functions
### 1. Whitelisting Role Contracts
```
whitelistRoleContract(address _contract, bool _status)
```
Any contract that follows the `IRole.sol` interface standard of the Jur Smart Contracts ecosystem will be recognized as a Role and can integrate with the Reward contract. This function is used to authenticate and integrate a Role contract.
1. **_contract** is the Role contract address.
2. **_status** is a bool flag indicating if it is authenticated or not.
 
### 2. Adding/Removing Jur Managers
```
updateManager(address _manager, bool _status)
```
Authenticating a Jur Manager.
1. **_manager** is the address which will be authorized as a Manager
2. **_status** is a bool flag indicating if it is authenticated or not.
 
 
## Manager Functions
### 1. Adding an activity
```
addActivity(string memory _name, uint256 _slotCount, uint256 _rewardAmount, address[] memory _roleContracts)
```
Adds a new activity.
1. **_name** is the name of the activity
2. **_slotCount** is the number of slots which will be present in the activity
3. **_rewardAmount** is the JUR token reward associated with a single slot
4. **_roleContracts** is an array of allowed role contract addresses. Only the wallet addresses registered with these contracts will be allowed to participate in the activity. If any role contract is not authenticated by the Admin first, the transaction will fail. An empty array indicates that activity is open for all.
 
### 2. Assigning Slots
```
assignSlot(uint256 _activityId, address _assignedTo, uint256 _dueDate)
```
Assigns a slot to a user.
1. **_activityId** the activity id on the smart contract generated while creating it.
2. **_assignedTo** the wallet address of the user the slot should be assigned to.
3. **_dueDate** UNIX timestamp of the due date of the activity slot. Post this date, the user will be able to mark a slot `Completed`. Jur holds the rights to unassign or cancel a slot at its discretion before the due date has reached and after it if the slot hasn't been marked `Completed` by a user.
 
### 3. Mark an activity active/inactive
```
changeActivityState(uint256 _activityId, bool _status)
```
Marks an activity as active or inactive
1. **_activityId** the activity id on the smart contract generated while creating it.
2. **_status** is a bool flag indicating the new state of the activity. When it is marked false, the existing assigned slots will be able to complete the process and withdraw the reward. However, Managers will not be able to assign or reassign remaining slots.
 
### 4. Marking a slot complete
```
markSlotComplete(uint256 _activityId, uint256 _slotId)
```
When called by a Manager, this function moves the slot from `Assigned` or `Completed` state to `Rewarded` state directly (regardless of the due date). `Rewarded` state will always initiate the reward transfer.
1. **_activityId** the activity id on the smart contract generated while creating it.
2. **_slotId** the relative id of a slot in its parent activity.
 
### 5. Canceling a Slot
```
cancelSlot(uint256 _activityId, uint256 _slotId)
```
Cancels a slot if it is not marked `Completed`. The reward amount is refunded back to the Manager's account when a slot is canceled. A canceled slot cannot be reassigned.
1. **_activityId** the activity id on the smart contract generated while creating it.
2. **_slotId** the relative id of a slot in its parent activity.
 
### 6. Unassigning a Slot
```
unassignSlot(uint256 _activityId, uint256 _slotId)
```
Unassigns a slot if it is not marked `Completed`. The user address and the due date assigned to it are removed from the slot details. This slot can always be reassigned to the same or different users.
1. **_activityId** the activity id on the smart contract generated while creating it.
2. **_slotId** the relative id of a slot in its parent activity.
 
### 7. Reassigning a Slot
```
reassignSlot(uint256 _activityId, uint256 _slotId, address _assignedTo, uint256 _dueDate)
```
Reassigns an `Unassigned` slot.
1. **_activityId** the activity id on the smart contract generated while creating it.
2. **_slotId** the relative id of a slot in its parent activity.
3. **_assignedTo** the wallet address of the user the slot should be assigned to.
4. **_dueDate** UNIX timestamp of the due date of the activity slot.
 
 
## User Functions
### 1. Withdrawing reward
```
withdrawReward(uint256 _activityId, uint256 _slotId)
```
Withdraws a `Completed` slot's reward.
1. **_activityId** the activity id on the smart contract generated while creating it.
2. **_slotId** the relative id of a slot in its parent activity.
 
### 2. Marking a slot complete
When called by the user, this function moves a slot from the `Assigned` to `Completed` state provided that the current time is more than the due date registered while assigning the slot.
```
markSlotComplete(uint256 _activityId, uint256 _slotId)
```
1. **_activityId** the activity id on the smart contract generated while creating it.
2. **_slotId** the relative id of a slot in its parent activity.
 
# Jur Rewards on the test network
 
#### Address - [0x8D505E33f4CEC7fC6AB6C6424A0Ce1BbfB920C4a](https://explore-testnet.vechain.org/accounts/0x8D505E33f4CEC7fC6AB6C6424A0Ce1BbfB920C4a)