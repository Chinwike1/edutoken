// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract EduToken {
    // define cryptocurrency with ERC-20 standard
    string public constant name = 'EDUTOKEN';
    string public constant symbol = 'EDU';
    uint8 public constant decimals = 18;

    event Transfer(address indexed _from, address indexed _to, uint256 _tokens);
    event Approval(address indexed _owner, address indexed _spender, uint _tokens);

    uint256 totalSupply_;

    // create "balances" collection to store no. of EduTokens in any wallet that has EduToken
    mapping(address => uint256) balances;
    // create "allowed" collection to ...
    mapping(address => mapping(address => uint256)) allowed;

    constructor() {
        totalSupply_ = 1000000 * 10 ** decimals; // 1 million
        balances[msg.sender] = totalSupply_; // send totalSupply of tokens to the person who deploys the smart contract (you)
    }

    function totalSupply() public view returns (uint256) {
        return totalSupply_;
    }

    function balanceOf(address tokenOwner) public view returns (uint) {
        return balances[tokenOwner];
    }

    function transfer(address _to, uint256 _tokens) public returns (bool) {
        // ensure sender is spending tokens they don't have
        require(_tokens <= balances[msg.sender]); 
        // subtract transfer value from sender's address
        balances[msg.sender] -= _tokens; 
        // add transfer value to recepient's address
        balances[_to] += _tokens; 
        // emit transfer event as part of the ERC-20 standard
        emit Transfer(msg.sender, _to, _tokens);
        return true;
    }
    
    // create approve funtion: ERC-20 standard
    function approve(address _spender, uint256 _tokens) public returns (bool) {
        allowed[msg.sender][_spender] = _tokens;
        emit Approval(msg.sender, _spender, _tokens);
        return true;
    }

    // create allowance funtion: ERC-20 standard
    function allowance(address _owner, address _spender) public view returns (uint) {
        return allowed[_owner][_spender];
    }

    // create transferFrom funtion: ERC-20 standard
    function transferFrom(address _from, address _to, uint256 _tokens) public returns (bool) {
        require(_tokens <= balances[_from]);
        require(_tokens <= allowed[_from][msg.sender]);
        balances[_from] -= _tokens;
        allowed[_from][msg.sender] -= _tokens;
        balances[_to] += _tokens;
        emit Transfer(_from, _to, _tokens);
        return true;
    }
}