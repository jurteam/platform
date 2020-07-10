pragma solidity ^0.5.0;

import "@openzeppelin/contracts/ownership/Ownable.sol";
/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there are multiple accounts (managers) that can be granted exclusive access to
 * specific functions.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyManager`, which can be applied to your functions to restrict their use to
 * the manager.
 */
contract Manageable is Context, Ownable {

    mapping(address => bool) public manager;

    event ManagerUpdated(address indexed manager, bool indexed state);

    /**
     * @dev Throws if called by any account other than the manager.
     */
    modifier onlyManager() {
        require(manager[msg.sender], "Manageable: caller is not a Manager");
        _;
    }

    /**
     * @dev Returns true if the caller is a manager.
     */
    function isManager(address _sender) public view returns (bool) {
        return manager[_sender];
    }

    /**
     * @dev Adds a new manager.
     */
    function updateManager(address _manager, bool _status) public onlyOwner {
        manager[_manager] = _status;
        emit ManagerUpdated(_manager, _status);
    }

    /**
     * @dev Leaves the contract without manager in case there is only one
     * manager alloted. It will not be possible to call
     * `onlyManager` functions anymore.
     */
    function renounceManagership() public onlyManager {
        manager[msg.sender] = false;
        emit ManagerUpdated(msg.sender, false);
    }
}