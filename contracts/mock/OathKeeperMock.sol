pragma solidity >=0.5.0 <0.7.0;

import "@openzeppelin/contracts/token//ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "../utils/DateTimeLib.sol";

contract OathKeeperMock is Ownable {
    using SafeMath for uint;
    using DateTimeLib for uint;

    struct LockSchedule {
        uint256 amount;
        uint256 startAt;
        uint256 releaseAt;
        uint256 lockInPeriod;
        bool isOathFulfilled;
    }
    struct Oaths {
        uint256 count;
        uint256 activeAmountLocked;
        uint256 totalAmountLocked;
    }
    /** Each address can have multiple funds locked under different schedules */
    mapping(address => mapping(uint => LockSchedule)) public lockMap;
    mapping(address => Oaths) public oathStats;
    /** JUR Token for distribution */
    IERC20 public jurToken;
    /** Keeps stats on oaths */
    uint256 public totalLockedTokens;
    uint256 public totalActiveLockedTokens;
    uint256 public totalOathCount;
    uint256 public totalActiveOathCount;

    uint256 public minimumLockPeriod = 10;
    uint256 public maximumLockPeriod = 60;

    event OathTaken(address _beneficiary, uint _amount, uint _lockInPeriod);
    event IHoldYourOathFulfilled(address _beneficiary, uint _amount);
    event ABrokenOath(address _beneficiary, uint _newRelease);

    /**
    @param _jurToken - Address of the JUR token contract which will be used for transferring the
    tokens.
    */
    constructor(address _jurToken) public {
        jurToken = IERC20(_jurToken);
    }

    function takeAnOath(uint _lockInPeriod, uint _startAt) public {
        uint _releaseAt;
        uint256 _amount = jurToken.allowance(msg.sender, address(this));
        require(_amount > 0, "Please approve token transfer to the contract.");
        require(_lockInPeriod >= minimumLockPeriod && _lockInPeriod <= maximumLockPeriod, "Please choose a valid lock in period.");
        oathStats[msg.sender].count = SafeMath.add(oathStats[msg.sender].count, 1);
        oathStats[msg.sender].activeAmountLocked = SafeMath.add(oathStats[msg.sender].activeAmountLocked, _amount);
        oathStats[msg.sender].totalAmountLocked = SafeMath.add(oathStats[msg.sender].totalAmountLocked, _amount);
        totalLockedTokens = SafeMath.add(totalLockedTokens, _amount);
        totalActiveLockedTokens = SafeMath.add(totalActiveLockedTokens, _amount);
        totalOathCount = SafeMath.add(totalOathCount, 1);
        totalActiveOathCount = SafeMath.add(totalActiveOathCount, 1);

        _releaseAt = DateTimeLib.addSeconds(now, _lockInPeriod);
        lockMap[msg.sender][oathStats[msg.sender].count] = LockSchedule(_amount, _startAt, _releaseAt, _lockInPeriod, false);
        // check if tokens can be transferred to this contract.
        require(jurToken.transferFrom(msg.sender, address(this), _amount), "Not able to transfer funds.");

        emit OathTaken(msg.sender, _amount, _lockInPeriod);
    }

    /**
    @dev releaseOath() - Release tokens as per vesting schedule, called by the owner.
    */
    function releaseOath(uint _oathId) public {
        LockSchedule storage _lockSchedule = lockMap[msg.sender][_oathId];

        require(now >= _lockSchedule.releaseAt, "You are still under an oath.");
        require(!_lockSchedule.isOathFulfilled, "Oath has been fulfilled.");

        _lockSchedule.isOathFulfilled = true;
        // update overall stats
        oathStats[msg.sender].activeAmountLocked = SafeMath.sub(oathStats[msg.sender].activeAmountLocked, _lockSchedule.amount);
        totalActiveLockedTokens = SafeMath.sub(totalActiveLockedTokens, _lockSchedule.amount);
        totalActiveOathCount = SafeMath.sub(totalActiveOathCount, 1);

        require(jurToken.transfer(msg.sender, _lockSchedule.amount), "Funds cannot be transferred");
        emit IHoldYourOathFulfilled(msg.sender, _lockSchedule.amount);
    }

    /**
    @dev updateLockPeriod() - Function for owner to update the lockin period requirements.
    */
    function updateLockPeriod(uint _minimumLockPeriod, uint _maximumLockPeriod) public onlyOwner {
        if(_minimumLockPeriod != 0) {
            minimumLockPeriod = _minimumLockPeriod;
        } if(_maximumLockPeriod != 0) {
            maximumLockPeriod = _maximumLockPeriod;
        }
        require(minimumLockPeriod < maximumLockPeriod, "Something is not right.");
    }

}