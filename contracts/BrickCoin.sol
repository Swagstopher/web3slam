// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BrickCoin is ERC20 {
    string public name = "BrickCoin";
    string public symbol = "BRKC";
    uint256 public decimals = 1;
    uint256 public INITIAL_SUPPLY = 15000000;
    
    constructor() public {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}
