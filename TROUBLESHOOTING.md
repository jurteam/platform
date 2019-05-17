# Troubleshooting

## Dependencies

### Truffle

Truffle on you host should be at the correct version that is compatible with `openzeppelin-solidity ^1.10.0`

### Web3

Web3 version should be the same between DApp and Protocol. Different versions are not compatible. Until now version is downgraded due protocol at `^1.0.0-beta.46`

## Metamask

### Error: the tx doesn't have the correct nonce

To fix this error you should reset your Metamask Account.

Just click on your account avatar, then go to _Settings > Advanced > **Reset Account**_

![](https://camo.githubusercontent.com/23b0ac3478fb0dc1819f0838a2e8e815f54c258c/687474703a2f2f64333376343333396a686c386b302e636c6f756466726f6e742e6e65742f646f63732f6173736574732f3561343638336235303432383633313933383030376231352f696d616765732f3561373231653635303432383633343337366366616562362f66696c652d5976586b504d775630672e706e67)

After this operation try again your transaction and now the nonce should be calculated correctly.
