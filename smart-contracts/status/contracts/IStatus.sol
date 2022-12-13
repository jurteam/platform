pragma solidity ^0.5.0;

interface  IStatus {
    event StateChanged(address statusHolder, bool newState, uint timestamp);
    event StatusTypeChanged(address statusHolder,string statusType, uint timestamp);
    event StatusAdded(address statusHolder, uint activationTime, string statusType);

    /**
    @dev addJurStatus - Function to let the Jur admin add a new address as a Jur Status, thus
    validating it's license which can be verified on the blockchain.
    @param _statusHolder - The address which will hold the Jur Status.
    @param _statusType - The position of the value from the statusTypes array signifying the
    status type.
    */
    function addJurStatus(address _statusHolder, uint _statusType) external;

    /**
    @dev changeState - Function to let the Jur admin change the state of a Jur Status.
    @param _statusHolder - The address holding the Jur Status.
    @param _newState -  Boolean status to update.
    */
    function changeState(address _statusHolder, bool _newState) external;

    /**
    @dev addStatusType - Function to let an admin add status types to support the bussiness
    logic.
    @param _statusType - The new status type.
    */
    function addStatusType(string calldata _statusType) external;

    /**
    @dev isStatus - Returns if a status is still active.
    @param _statusHolder - The address holding the Jur Status.
    */
    function isStatus(address _statusHolder) external view returns (bool);

    /**
    @dev getStatus - Returns the details of a Status
    @param _statusHolder - The address holding the Jur Status.
    */
    function getStatus(address _statusHolder) external view returns (uint, bool, string memory);

    /**
    @dev getStatusCount - Returns the total number of statuses
    */
    function getStatusCount() external view returns (uint256);

    /**
    @dev getStatusTypeCount - Returns the total number of status types
    */
    function getStatusTypeCount() external view returns (uint256);

    /**
    @dev getStatusType - Returns the string value stored for each status type
    */
    function getStatusType(uint256 _index) external view returns (string memory);
}