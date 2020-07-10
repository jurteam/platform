pragma solidity >=0.5.0 <0.7.0;

import "../JurRewards.sol";

contract JurRewardsMock is JurRewards {
    constructor(address _jurToken) public JurRewards(_jurToken) {}

    function getNow() public view returns (uint256) {
        return block.timestamp;
    }
}
