pragma solidity >=0.5.1 <0.7.0;

import "../IRole.sol";

contract JURRoleMock is IRole {
    string private roleName = "JUR_ADVOCATE";

    mapping(address => bool) public users;

    function getRole() external view returns (string memory) {
        return roleName;
    }

    function addUser(address _wallet) public {
        users[_wallet] = true;
    }

    function isUser(address _wallet) public view returns (bool) {
        return users[_wallet];
    }
}
