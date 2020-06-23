pragma solidity >=0.5.0 <0.7.0;

import "@openzeppelin/contracts/ownership/Ownable.sol";
import "./IStatus.sol";

contract JurStatus is IStatus, Ownable {

    /**
    Struct defining the values of a Jur Status.
    activationTime - The timestamp from which the status will be valid.
    isActive - Boolean state depicting if a Jur Status is currently valid.
    statusType - The type of the Jur Status complementing the bussiness logic.
    */
    struct Status {
        address statusHolder;
        uint activationTime;
        uint statusCount;
        bool isActive;
        string statusType;
    }

    /** Dynamic array holding the status types */
    string[] private statusTypes;

    /** Mapping between the address of the Jur Status holders and their properties. */
    mapping(address  => Status) public status;
    mapping(uint => Status) public statusList;

    /** Total count of Jur Statuses. */
    uint private statusCount;

    /**
    @dev addJurStatus - Function to let the Jur admin add a new address as a Jur Status, thus
    validating it's license which can be verified on the blockchain.
    @param _statusHolder - The address which will hold the Jur Status.
    @param _statusType - The position of the value from the statusTypes array signifying the
    status type.
    */
    function addJurStatus(address _statusHolder, uint _statusType) public onlyOwner {
        require(_statusHolder != address(0), "Please provide a valid address.");
        assert(_statusType <= statusTypes.length);
        status[_statusHolder] = Status(_statusHolder, now, statusCount, true, statusTypes[_statusType]);
        statusList[statusCount] = Status(_statusHolder, now, statusCount, true, statusTypes[_statusType]);
        statusCount++;

        emit StatusAdded(_statusHolder, now, statusTypes[_statusType]);
    }

    /**
    @dev changeState - Function to let the Jur admin change the state of a Jur Status.
    @param _statusHolder - The address holding the Jur Status.
    @param _newState -  Boolean status to update.
    */
    function changeState(address _statusHolder, bool _newState) public onlyOwner {
        require(_statusHolder != address(0), "Please provide a valid address.");
        Status storage _status = status[_statusHolder];
        Status storage _statusList = statusList[_status.statusCount];
        require(_status.activationTime != 0, "Address is not a Jur Status holder.");
        // require(_status.isActive != _newState, "Already in the similar state.");
        _status.isActive = _newState;
        _statusList.isActive = _newState;

        emit StateChanged(_statusHolder, _newState, now);
    }

    /**
    @dev changeState - Function to let the Jur admin change the state of a Jur Status.
    @param _statusHolder - The address holding the Jur Status.
    @param _statusType -  Status type to update to update.
    */
    function changeStatusType(address _statusHolder, uint _statusType) public onlyOwner {
        require(_statusHolder != address(0), "Please provide a valid address.");
        assert(_statusType <= statusTypes.length);
        Status storage _status = status[_statusHolder];
        Status storage _statusList = statusList[_status.statusCount];
        require(_status.activationTime != 0, "Address is not a Jur Status holder.");
        _status.statusType = statusTypes[_statusType];
        _statusList.statusType = statusTypes[_statusType];

        emit StatusTypeChanged(_statusHolder, statusTypes[_statusType], now);
    }

    /**
    @dev addStatusType - Function to let an admin add status types to support the bussiness
    logic.
    @param _statusType - The new status type.
    */
    function addStatusType(string memory _statusType) public onlyOwner {
        require(bytes(_statusType).length != 0, "Status type cannot be an empty string.");
        statusTypes.push(_statusType);
    }

    function isStatus(address _statusHolder) public view returns(bool) {
        Status storage _status = status[_statusHolder];
        return(_status.isActive);
    }

    function getStatus(address _statusHolder) public view returns(uint, bool, string memory) {
        Status storage _status = status[_statusHolder];
        return(_status.activationTime, _status.isActive, _status.statusType);
    }

    function getStatusCount() public view returns (uint256) {
        return(statusCount);
    }

    function getStatusTypeCount() public view returns (uint256) {
        return (statusTypes.length);
    }

    function getStatusType(uint256 _index) public view returns (string memory) {
        return(statusTypes[_index]);
    }
}