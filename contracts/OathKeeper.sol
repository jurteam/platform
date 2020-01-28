pragma solidity >=0.5.0 <0.7.0;

import "@openzeppelin/contracts/token//ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "./utils/DateTimeLib.sol";

contract OathKeeper is Ownable {
    using SafeMath for uint;
    using DateTimeLib for uint;

    /** JUR Token for distribution */
    ERC20 public jurToken;
    /** Keeps track of total tokens locked*/
    uint256 public totalLockedTokens;
    /** Vesting structure */
    struct VestingSchedule {
        uint256 amount;
        uint256 startAt;
        uint256 releaseAt;
        uint256 lockInPeriod;
        bool isOathFulfilled;
    }
    /** Each address can have multiple funds vesting under different schedules */
    mapping (uint => VestingSchedule) public vestingMap;
    /** No. of vestings associated with an address */
    uint public oathCount;

    event OathTaken(address _beneficiary, uint _amount);
    event IHoldYourOathFulfilled(address _beneficiary, uint _amount);
    event ABrokenOath(address _beneficiary, uint _newRelease);

    /**
    @param _jurToken - Address of the JUR token contract which will be used for transferring the
    tokens.
    */
    constructor(address _jurToken) public {
        jurToken = ERC20(_jurToken);
    }

    /**
    @dev takeAnOath - Any JUR token holder can use this function to lock their tokens for a certain
    time period.
    @param _lockInPeriod - Number of months to lock the token for.
    */
    function takeAnOath(uint _lockInPeriod) public {
        uint _amount = jurToken.allowance(msg.sender, address(this));
        require(vestingMap[msg.sender].startAt == 0, "Already under oath.");
        require(_amount > 0, "Please approve token transfer to the contract.");

        _releaseAt = DateTimeLib.addMonths(block.timeStamp, _lockInPeriod);
        vestingMap[msg.sender] = VestingSchedule(_amount, now, _lockInPeriod, _releaseAt, false);
        totalLockedTokens = SafeMath.add(totalLockedTokens, _amount);
        oathCount = SafeMath.add(oathCount, 1);
        // check if tokens can be transferred to this contract.
        require(jurToken.transferFrom(msg.sender, address(this), _amount), "Not able to transfer funds.");

        emit OathTaken(_beneficiary, _amount);
    }

    /**
    @dev releaseOath() - Release tokens as per vesting schedule, called by the owner.
    */
    function releaseOath() public {
        VestingSchedule storage _vestingSchedule = vestingMap[msg.sender];

        require(now >= _vestingSchedule.releaseAt, "You are still under an oath.");
        require(!_vestingSchedule.isOathFulfilled, "Oath has been fulfilled.");

        // decrement overall unreleased token count
        totalLockedTokens = SafeMath.sub(totalLockedTokens, _vestingSchedule.amount);
        _vestingSchedule.isOathFulfilled = true;

        require(jurToken.transfer(msg.sender, _vestingSchedule.amount), "Funds cannot be transferred.");
        emit IHoldYourOathFulfilled(msg.sender, _vestingSchedule.amount);
    }

    /**
    @dev renege() - A public function which can be called by the owner to provide flexibility
    with the release date.
    @param _promisee - Address of the oath holder.
    @param _newRelease - uint timestamp of the new release date and time.
    */
    function renege(address _promisee, uint _newRelease) public onlyOwner {
        VestingSchedule storage _vestingSchedule = vestingMap[msg.sender];

        require(now < _vestingSchedule.releaseAt, "You are still under an oath.");
        _vestingSchedule.releaseAt = _newRelease;

        emit ABrokenOath(_promisee, _newRelease);
    }

}