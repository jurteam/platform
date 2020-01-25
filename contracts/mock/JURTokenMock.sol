pragma solidity >=0.5.1 <0.7.0;


import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract JURTokenMock is ERC20 {
    string public constant symbol = "JUR";
    uint8 public constant decimals = 18;

    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }
}