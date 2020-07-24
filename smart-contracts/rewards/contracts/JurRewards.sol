pragma solidity >=0.5.0 <0.7.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "./Manageable.sol";
import "./IRole.sol";

contract JurRewards is Manageable {
    event RoleContractUpdated(address contractAddress, string role, bool status);
    event ActivityCreated(
        uint256 activityId,
        uint256 slotCount,
        uint256 rewardAmount,
        string name,
        address[] whitelistContractAddresses
    );
    event ActivityUpdated(uint256 activityId, uint256 slotCount, bool newState);
    event SlotAssigned(
        uint256 activityId,
        uint256 slotId,
        address assignedTo,
        uint256 createdAt,
        uint256 dueDate
    );
    event SlotUpdated(uint256 activityId, uint256 slotId, string newState);
    event SlotRewarded(
        uint256 activityId,
        uint256 slotId,
        uint256 rewardAmount
    );

    enum SlotState {Assigned, Completed, Rewarded, Unassigned, Cancelled}

    struct Activity {
        uint256 id;
        string name;
        uint256 slotCount;
        uint256 slotAssigned;
        uint256 rewardAmount;
        bool isActive;
        address funder;
        address[] whiteListedContracts;
    }
    struct Slot {
        uint256 id;
        uint256 activityId;
        SlotState state;
        address assignedTo;
        uint256 createdAt;
        uint256 dueDate;
        uint256 rewardId;
    }
    struct Rewards {
        uint256 activityId;
        uint256 slotId;
        uint256 rewardAmount;
        uint256 rewardedOn;
    }
    struct RewardeeStats {
        uint256 rewardCount;
        uint256 amountRewarded;
    }
    struct RoleContract {
        string name;
        bool isActive;
    }

    IRole private role;
    /** JUR Token for distribution */
    IERC20 public jurToken;
    uint256 public activityCount;

    mapping(address => RoleContract) public whitelistedContracts;
    mapping(uint256 => Activity) public activities;
    mapping(uint256 => mapping(uint256 => Slot)) public slots;
    mapping(address => mapping(uint256 => Rewards)) public rewards;
    mapping(address => RewardeeStats) public rewardeeStats;

    uint256 public rewardedAmount;
    uint256 public activityBalance;
    uint256 public rewardCount;
    uint256 public REWARD_DELAY = 7 days;

    constructor(address _token) public {
        jurToken = IERC20(_token);
    }

    /**
    @notice Whitelist a role contract. Only contracts implementing the IRole interface will be allowed.
    */
    function whitelistRoleContract(address _contract, bool _status)
        public
        onlyOwner
    {
        role = IRole(_contract);
        require(bytes(role.getRole()).length != 0, "Not a valid Jur Role");
        require(_contract != address(0), "Not a valid contrat");
        whitelistedContracts[_contract] = RoleContract(role.getRole(), _status);
        emit RoleContractUpdated(_contract, role.getRole(), _status);
    }

    function addActivity(string memory _name,
        uint256 _slotCount,
        uint256 _rewardAmount,
        address[] memory _roleContracts) public {
        _addActivity(_name, _slotCount, _rewardAmount, _roleContracts, msg.sender);
    }

    function addActivityJUR(string memory _name,
        uint256 _slotCount,
        uint256 _rewardAmount,
        address[] memory _roleContracts,
        address _funder) public {
        _addActivity(_name, _slotCount, _rewardAmount, _roleContracts, _funder);
    }

    /**
    @notice Add a new activity.
    @param _name Name/Description of the activity.
    @param _slotCount Maximum number of slots in an activity.
    @param _rewardAmount Reward amount for one activity.
    @param _roleContracts Array holding the contract addresses of the Roles contract allowed by the contract.
    */
    function _addActivity(
        string memory _name,
        uint256 _slotCount,
        uint256 _rewardAmount,
        address[] memory _roleContracts,
        address _funder
    ) internal onlyManager {
        for (uint256 i = 0; i < _roleContracts.length; i++) {
            require(
                whitelistedContracts[_roleContracts[i]].isActive,
                "Role contract is not whitelisted."
            );
        }
        require(_slotCount < 50, "Cannot create more than 50 slots");
        require(
            jurToken.allowance(_funder, address(this)) >=
                SafeMath.mul(_rewardAmount, _slotCount),
            "Approve balance first"
        );
        activities[activityCount] = Activity(
            activityCount,
            _name,
            _slotCount,
            0,
            _rewardAmount,
            true,
            _funder,
            _roleContracts
        );
        activityBalance = SafeMath.add(
            activityBalance,
            SafeMath.mul(_rewardAmount, _slotCount)
        );
        require(
            jurToken.transferFrom(
                _funder,
                address(this),
                SafeMath.mul(_rewardAmount, _slotCount)
            ),
            "Not able to transfer funds."
        );
        emit ActivityCreated(
            activityCount,
            _slotCount,
            _rewardAmount,
            _name,
            _roleContracts
        );
        activityCount++;
    }

    /**
    @notice Assign a slot.
    @param _activityId The id of the activity.
    @param _assignedTo Address of the rewardee.
    @param _dueDate The due date of the due date.
    */
    function assignSlot(
        uint256 _activityId,
        address _assignedTo,
        uint256 _dueDate
    ) public onlyManager {
        Activity storage _activity = activities[_activityId];
        require(_activity.isActive, "Activity is not active anymore");
        require(
            _activity.slotAssigned < _activity.slotCount,
            "All slots are full"
        );
        require(_dueDate > block.timestamp, "Cannot set a past date");
        if (_activity.whiteListedContracts.length > 0) {
            for (
                uint256 i = 0;
                i < _activity.whiteListedContracts.length;
                i++
            ) {
                role = IRole(_activity.whiteListedContracts[i]);
                require(
                    role.isUser(_assignedTo),
                    "User does not have a whitelisted role"
                );
            }
        }

        slots[_activityId][_activity.slotAssigned] = Slot(
            _activity.slotAssigned,
            _activityId,
            SlotState.Assigned,
            _assignedTo,
            block.timestamp,
            _dueDate,
            0
        );
        emit SlotAssigned(
            _activityId,
            _activity.slotAssigned,
            _assignedTo,
            block.timestamp,
            _dueDate
        );
        _activity.slotAssigned++;
    }

    /**
    @notice Add new slots.
    @param _activityId The id of the activity.
    @param _slotCount The numbe rof new slots to add.
    */
    function addSlots(uint256 _activityId, uint256 _slotCount)
        public
        onlyManager
    {
        Activity storage _activity = activities[_activityId];
        require(_activity.isActive, "Activity is not active anymore");
        require(
            jurToken.allowance(msg.sender, address(this)) >=
                SafeMath.mul(_activity.rewardAmount, _slotCount),
            "Approve balance first"
        );
        _activity.slotCount = SafeMath.add(_activity.slotCount, _slotCount);
        require(
            jurToken.transferFrom(
                msg.sender,
                address(this),
                SafeMath.mul(_activity.rewardAmount, _slotCount)
            ),
            "Not able to transfer funds."
        );
        emit ActivityUpdated(_activityId, _activity.slotCount, false);
    }

    /**
    @notice Change the state of the activity..
    @param _activityId The id of the activity.
    @param _status Address of the rewardee.
    */
    function changeActivityState(uint256 _activityId, bool _status)
        public
        onlyManager
    {
        Activity storage _activity = activities[_activityId];
        _activity.isActive = _status;
        emit ActivityUpdated(_activityId, 0, _status);
    }

    /**
    @notice Mark a slot complete.
    @param _activityId The id of the activity.
    @param _slotId The id of the slot in the activity.
    */
    function markSlotComplete(uint256 _activityId, uint256 _slotId) public {
        Activity storage _activity = activities[_activityId];
        Slot storage _slot = slots[_activityId][_slotId];
        RewardeeStats storage _stats = rewardeeStats[_slot.assignedTo];
        require(
            isManager(msg.sender) || msg.sender == _slot.assignedTo,
            "User not authorized"
        );
        if (isManager(msg.sender)) {
            require(
                _slot.state == SlotState.Assigned ||
                    _slot.state == SlotState.Completed,
                "Slot is not in required state"
            );
            _slot.state = SlotState.Rewarded;
            _slot.rewardId = _stats.rewardCount;
            rewards[_slot.assignedTo][_stats.rewardCount] = Rewards(
                _activityId,
                _slotId,
                _activity.rewardAmount,
                block.timestamp
            );
            _stats.rewardCount++;
            rewardCount++;
            _stats.amountRewarded = SafeMath.add(
                _stats.amountRewarded,
                _activity.rewardAmount
            );
            rewardedAmount = SafeMath.add(
                rewardedAmount,
                _activity.rewardAmount
            );
            activityBalance = SafeMath.sub(
                activityBalance,
                _activity.rewardAmount
            );
            require(
                jurToken.transfer(_slot.assignedTo, _activity.rewardAmount),
                "Not able to transfer funds."
            );
            emit SlotRewarded(_activityId, _slotId, _activity.rewardAmount);
        } else if (msg.sender == _slot.assignedTo) {
            require(_slot.state == SlotState.Assigned, "Slot is not assigned");
            require(
                block.timestamp > _slot.dueDate,
                "Due date has not been realized."
            );
            _slot.state = SlotState.Completed;
            emit SlotUpdated(_activityId, _slotId, getSlotState(SlotState.Completed));
        }
    }

    /**
    @notice Cancel a slot.
    @param _activityId The id of the activity.
    @param _slotId The id of the slot in the activity.
    */
    function cancelSlot(uint256 _activityId, uint256 _slotId)
        public
        onlyManager
    {
        Activity storage _activity = activities[_activityId];
        Slot storage _slot = slots[_activityId][_slotId];
        require(
            _slot.state != SlotState.Completed &&
                _slot.state != SlotState.Rewarded,
            "Slot is not in the required state"
        );
        _slot.state = SlotState.Cancelled;
        _slot.assignedTo = address(0);
        _slot.dueDate = 0;
        activityBalance = SafeMath.sub(activityBalance, _activity.rewardAmount);
        require(
            jurToken.transfer(_activity.funder, _activity.rewardAmount),
            "Not able to transfer funds."
        );
        emit SlotUpdated(_activityId, _slotId, getSlotState(SlotState.Cancelled));
    }

    /**
    @notice Unassign a slot.
    @param _activityId The id of the activity.
    @param _slotId The id of the slot in the activity.
    */
    function unassignSlot(uint256 _activityId, uint256 _slotId)
        public
        onlyManager
    {
        Activity storage _activity = activities[_activityId];
        Slot storage _slot = slots[_activityId][_slotId];
        require(
            _slot.state != SlotState.Completed &&
                _slot.state != SlotState.Rewarded,
            "Slot is not in the required state"
        );
        _slot.state = SlotState.Unassigned;
        _slot.assignedTo = address(0);
        _slot.dueDate = 0;
        _activity.slotAssigned;
        emit SlotUpdated(_activityId, _slotId, getSlotState(SlotState.Unassigned));
    }

    /**
    @notice Withdraw a slot's reward amount.
    @param _activityId The id of the activity.
    @param _slotId The id of the slot in the activity.
    */
    function withdrawReward(uint256 _activityId, uint256 _slotId) public {
        Activity storage _activity = activities[_activityId];
        Slot storage _slot = slots[_activityId][_slotId];
        RewardeeStats storage _stats = rewardeeStats[_slot.assignedTo];
        require(msg.sender == _slot.assignedTo, "User not authorized");
        require(_slot.state == SlotState.Completed, "Slot is not completed");
        require(block.timestamp >= SafeMath.add(_slot.dueDate, REWARD_DELAY));
        _slot.state = SlotState.Rewarded;
        _slot.rewardId = _stats.rewardCount;
        rewards[_slot.assignedTo][_stats.rewardCount] = Rewards(
            _activityId,
            _slotId,
            _activity.rewardAmount,
            block.timestamp
        );
        _stats.rewardCount++;
        rewardCount++;
        SafeMath.add(_stats.amountRewarded, _activity.rewardAmount);
        require(
            jurToken.transfer(_slot.assignedTo, _activity.rewardAmount),
            "Not able to transfer funds."
        );
        emit SlotRewarded(_activityId, _slotId, _activity.rewardAmount);
    }

    /**
    @notice Reassign an unassignedslot.
    @param _activityId The id of the activity.
    @param _slotId The id of the slot in the activity.
    @param _assignedTo The address of the rewardee to assign the slot to.
    @param _dueDate The due date for the slot.
    */
    function reassignSlot(
        uint256 _activityId,
        uint256 _slotId,
        address _assignedTo,
        uint256 _dueDate
    ) public onlyManager {
        Activity storage _activity = activities[_activityId];
        Slot storage _slot = slots[_activityId][_slotId];
        require(_activity.isActive, "Activity is not active anymore");
        require(
            _slot.state == SlotState.Unassigned,
            "Slot is not in the required state"
        );
        require(_dueDate > block.timestamp, "Cannot set a past date");
        if (_activity.whiteListedContracts.length > 0) {
            for (
                uint256 i = 0;
                i < _activity.whiteListedContracts.length;
                i++
            ) {
                role = IRole(_activity.whiteListedContracts[i]);
                require(
                    role.isUser(_assignedTo),
                    "User does not have a whitelisted role"
                );
            }
        }

        slots[_activityId][_slotId] = Slot(
            _slotId,
            _activityId,
            SlotState.Assigned,
            _assignedTo,
            block.timestamp,
            _dueDate,
            0
        );
        emit SlotAssigned(
            _activityId,
            _slotId,
            _assignedTo,
            block.timestamp,
            _dueDate
        );
    }

    function canWithdraw(uint256 _activityId, uint256 _slotId)
        public
        view
        returns (bool, uint256)
    {
        Slot storage _slot = slots[_activityId][_slotId];
        uint256 _withdrawAt = SafeMath.add(_slot.dueDate, REWARD_DELAY);
        if (
            (_slot.state == SlotState.Assigned ||
                _slot.state == SlotState.Completed) &&
            (block.timestamp >= _withdrawAt)
        ) {
            return (true, _withdrawAt);
        } else return (false, _withdrawAt);
    }

    function getWhitelistedContracts(uint256 _activityId) public view returns(address[] memory) {
        Activity storage _activity = activities[_activityId];
        return _activity.whiteListedContracts;
    }

    function getSlotState(SlotState _state) internal view returns(string memory) {
        if(_state == SlotState.Assigned) return "Assigned";
        if(_state == SlotState.Completed) return "Completed";
        if(_state == SlotState.Rewarded) return "Rewarded";
        if(_state == SlotState.Unassigned) return "Unassigned";
        if(_state == SlotState.Cancelled) return "Cancelled";
    }
}
