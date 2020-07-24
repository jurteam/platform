pragma solidity ^0.5.0;

interface IRole {
    /**
    @dev getName - returns the user role.
    */
    function getRole() external view returns (string memory);

    /**
    @dev isStatus - Returns if a wallet is an active user.
    @param _wallet - The address to check.
    */
    function isUser(address _wallet) external view returns (bool);
}
