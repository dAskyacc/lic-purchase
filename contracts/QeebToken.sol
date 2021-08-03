// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.4.0 <0.7.0;

import './ERC20.sol';
import './owned.sol';

contract QeebToken is ERC20, owned {
    string public constant name = 'Queen Bee Music Share System Token';
    string public constant symbol = 'QEEB';

    uint8 public constant decimals = 18;
    uint256 public constant INITIAL_SUPPLY = 100e8 * (10**uint256(decimals));

    constructor() public {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function burn(address _account, uint256 _amount) external onlyOwner {
        _burn(_account, _amount);
    }

    function burnFrom(address _account, uint256 _amount) external onlyOwner {
        _burnFrom(_account, _amount);
    }
}
