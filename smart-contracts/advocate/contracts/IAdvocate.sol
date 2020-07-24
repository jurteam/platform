pragma solidity ^0.5.0;

interface  IAdvocate {
    event AdvocateStateUpdated(address wallet, bool newState);
    event AdvocateTypeUpdated(address wallet, string advocateType);
    event AdvocateAdded(
        address wallet,
        uint256 activationTime,
        string advocateType
    );

    /**
    @dev getAdvocate - Returns the details of an Advocate
    @param _wallet - The address of the Jur Advocate.
    */
    function getAdvocate(address _wallet) external view returns (uint, bool, string memory);
}