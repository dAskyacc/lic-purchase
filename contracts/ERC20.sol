// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.4.0 <0.7.0;

import './IERC20.sol';
import './SafeMath.sol';

contract ERC20 is IERC20 {
    using SafeMath for uint256;

    mapping(address => uint256) private _balances;

    mapping(address => mapping(address => uint256)) private _allowed;

    uint256 private _totalSupply;

    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev Gets the balance of the specified address.
     * @param _owner The address to query the balance of.
     * @return An uint256 representing the amount owned by the passed address.
     */
    function balanceOf(address _owner) public view override returns (uint256) {
        return _balances[_owner];
    }

    /**
     * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
     * Beware that changing an allowance with this method brings the risk that someone may use both the old
     * and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this
     * race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     * @param _owner The address which will spend the funds.
     * @param _spender The amount of tokens to be spent.
     */
    function allowance(address _owner, address _spender)
        public
        view
        override
        returns (uint256)
    {
        return _allowed[_owner][_spender];
    }

    /**
     * @dev Transfer token for a specified address
     * @param _to The address to transfer to.
     * @param _value The amount to be transferred.
     */
    function transfer(address _to, uint256 _value)
        public
        override
        returns (bool)
    {
        require(_value <= _balances[msg.sender]);

        require(_to != address(0));

        _balances[msg.sender] = _balances[msg.sender].sub(_value);
        _balances[_to] = _balances[_to].add(_value);

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    function approve(address _spender, uint256 _value)
        public
        override
        returns (bool)
    {
        require(_spender != address(0));

        require(_value <= _balances[msg.sender]);

        _allowed[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    /**
     * @dev Transfer tokens from one address to another
     * @param _from address The address which you want to send tokens from
     * @param _to address The address which you want to transfer to
     * @param _value uint256 the amount of tokens to be transferred
     */
    function transferForm(
        address _from,
        address _to,
        uint256 _value
    ) public override returns (bool) {
        require(_value <= _balances[_from]);
        require(_value <= _allowed[_from][msg.sender]);

        require(_to != address(0));

        _balances[_from] = _balances[_from].sub(_value);
        _balances[_to] = _balances[_to].add(_value);

        _allowed[_from][msg.sender] = _allowed[_from][msg.sender].sub(_value);

        emit Transfer(_from, _to, _value);

        return true;
    }

    /**
     * @dev Decrease the amount of tokens that an owner allowed to a spender.
     * approve should be called when allowed_[_spender] == 0. To decrement
     * allowed value is better to use this function to avoid 2 calls (and wait until
     * the first transaction is mined)
     * From MonolithDAO Token.sol
     * @param _spender The address which will spend the funds.
     * @param _addedValue The amount of tokens to decrease the allowance by.
     * @return after increased allowance
     */
    function increaseAllowance(address _spender, uint256 _addedValue)
        public
        returns (uint256)
    {
        require(_spender != address(0));

        // require(_allowed[msg.sender][_spender].add(_addedValue) <= _balances[_spender])

        if (
            _allowed[msg.sender][_spender].add(_addedValue) <
            _balances[_spender]
        ) {
            _allowed[msg.sender][_spender] = (
                _allowed[msg.sender][_spender].add(_addedValue)
            );
        } else {
            _allowed[msg.sender][_spender] = _balances[_spender];
        }

        emit Approval(msg.sender, _spender, _allowed[msg.sender][_spender]);
        return _allowed[msg.sender][_spender];
    }

    function decreaseAllowance(address _spender, uint256 _subtractedValue)
        public
        returns (uint256)
    {
        require(_spender != address(0));

        _allowed[msg.sender][_spender] = (
            _allowed[msg.sender][_spender].sub(_subtractedValue)
        );

        emit Approval(msg.sender, _spender, _allowed[msg.sender][_spender]);

        return _allowed[msg.sender][_spender];
    }

    function _mint(address _account, uint256 _amount) internal {
        require(_account != address(0));

        _totalSupply = _totalSupply.add(_amount);
        _balances[_account] = _balances[_account].add(_amount);

        emit Transfer(address(0), _account, _amount);
    }

    function _burn(address _account, uint256 _amount) internal {
        require(_account != address(0));
        require(_amount <= _balances[_account]);

        _totalSupply = _totalSupply.sub(_amount);
        _balances[_account] = _balances[_account].sub(_amount);

        emit Transfer(_account, address(0), _amount);
    }

    /**
     * @dev Internal function that burns an amount of the token of a given
     * account, deducting from the sender's allowance for said account. Uses the
     * internal burn function.
     * @param _account The account whose tokens will be burnt.
     * @param _amount The amount that will be burnt.
     */
    function _burnFrom(address _account, uint256 _amount) internal {
        require(_amount <= _allowed[_account][msg.sender]);

        _allowed[_account][msg.sender] = _allowed[_account][msg.sender].sub(
            _amount
        );

        _burn(_account, _amount);
    }
}
