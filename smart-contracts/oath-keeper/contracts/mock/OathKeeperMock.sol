pragma solidity >=0.5.0 <0.7.0;

import "../OathKeeper.sol";
import "../utils/DateTimeLib.sol";

contract OathKeeperMock is OathKeeper {

  constructor(address _jurToken) public
  OathKeeper(_jurToken)
  {}

  function getNow() public view returns (uint256) {
      return block.timestamp;
  }

}