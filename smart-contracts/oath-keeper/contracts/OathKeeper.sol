pragma solidity >=0.5.0 <0.7.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "./utils/DateTimeLib.sol";

contract OathKeeper is Ownable {
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
        // uint256 activeAmountLocked;
        uint256 totalAmountLocked;
    }
    /** Each address can have multiple funds locked under different schedules */
    mapping(address => mapping(uint => LockSchedule)) public lockMap;
    /** The overall oath stats related to each address */
    mapping(address => Oaths) public oathStats;
    /** JUR Token for distribution */
    IERC20 public jurToken;
    /** Stats on oaths in the contract overall */
    uint256 public totalLockedTokens;
    // uint256 public totalActiveLockedTokens;
    uint256 public totalOathCount;
    // uint256 public totalActiveOathCount;

    uint256 public minimumLockPeriod = 1;
    uint256 public maximumLockPeriod = 36;
    uint256 public minimumLockAmount = 10000000000000000;

    event OathTaken(address indexed _beneficiary, uint indexed _amount, uint indexed _lockInPeriod, uint _startAt, uint _releaseAt, uint _oathIndex);
    event IHoldYourOathFulfilled(address indexed _beneficiary, uint indexed _amount, uint indexed _oathIndex);

    /**
    @param _jurToken - Address of the JUR token contract which will be used for transferring the
    tokens.
    */
    constructor(address _jurToken) public {
        jurToken = IERC20(_jurToken);
    }

    /**
    @dev takeAnOath - Any JUR token holder can use this function to lock their tokens for a certain
    time period.
    @param _lockInPeriod - Number of months to lock the token for.
    */
    function takeAnOath(uint _lockInPeriod) public {
        _takeAnOath(_lockInPeriod, msg.sender);
    }

    /**
    @dev takeAnOath - Used for taking an oath as an `allowed` function in JUR Token.
    @param _lockInPeriod - Number of months to lock the token for.
    @param _oathTaker - Address of th oath taker.
    */
    function takeAnOathJUR(uint _lockInPeriod, address _oathTaker) public {
        _takeAnOath(_lockInPeriod, _oathTaker);
    }

    function _takeAnOath(uint _lockInPeriod, address _oathTaker) internal {
        uint _releaseAt;
        uint256 _amount = jurToken.allowance(_oathTaker, address(this));
        require(_amount >= minimumLockAmount, "Please approve token transfer to the contract.");
        require(_lockInPeriod >= minimumLockPeriod && _lockInPeriod <= maximumLockPeriod, "Please choose a valid lock in period.");
        oathStats[_oathTaker].count = SafeMath.add(oathStats[_oathTaker].count, 1);
        // oathStats[_oathTaker].activeAmountLocked = SafeMath.add(oathStats[_oathTaker].activeAmountLocked, _amount);
        oathStats[_oathTaker].totalAmountLocked = SafeMath.add(oathStats[_oathTaker].totalAmountLocked, _amount);
        totalLockedTokens = SafeMath.add(totalLockedTokens, _amount);
        // totalActiveLockedTokens = SafeMath.add(totalActiveLockedTokens, _amount);
        totalOathCount = SafeMath.add(totalOathCount, 1);
        // totalActiveOathCount = SafeMath.add(totalActiveOathCount, 1);

        _releaseAt = DateTimeLib.addMonths(now, _lockInPeriod);
        lockMap[_oathTaker][oathStats[_oathTaker].count] = LockSchedule(_amount, now, _releaseAt, _lockInPeriod, false);
        // check if tokens can be transferred to this contract.
        require(jurToken.transferFrom(_oathTaker, address(this), _amount), "Not able to transfer funds.");

        emit OathTaken(_oathTaker, _amount, _lockInPeriod, now, _releaseAt, oathStats[_oathTaker].count);
    }

    /**
    @dev releaseOath() - Release tokens as per vesting schedule, called by the owner.
    */
    function releaseOath(uint _oathIndex) public {
        LockSchedule storage _lockSchedule = lockMap[msg.sender][_oathIndex];

        require(now >= _lockSchedule.releaseAt, "You are still under an oath.");
        require(!_lockSchedule.isOathFulfilled, "Oath has been fulfilled.");

        _lockSchedule.isOathFulfilled = true;
        // update overall stats
        // oathStats[msg.sender].activeAmountLocked = SafeMath.sub(oathStats[msg.sender].activeAmountLocked, _lockSchedule.amount);
        // totalActiveLockedTokens = SafeMath.sub(totalActiveLockedTokens, _lockSchedule.amount);
        // totalActiveOathCount = SafeMath.sub(totalActiveOathCount, 1);

        require(jurToken.transfer(msg.sender, _lockSchedule.amount), "Funds cannot be transferred");
        emit IHoldYourOathFulfilled(msg.sender, _lockSchedule.amount, _oathIndex);
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

    /**
    @dev renege() - A public function which can be called by the owner to provide flexibility
    with the release date.
    @param _promisee - Address of the oath holder.
    @param _newRelease - uint timestamp of the new release date and time.
    */
    // function renege(address _promisee, uint _newRelease) public onlyOwner {
    //     LockSchedule storage _lockSchedule = lockMap[msg.sender];

    //     require(now < _lockSchedule.releaseAt, "Oath is over");
    //     _lockSchedule.releaseAt = _newRelease;

    //     emit ABrokenOath(_promisee, _newRelease);
    // }

}