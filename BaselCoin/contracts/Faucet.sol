//SPDX-License-Identifier: MIT


pragma solidity ^0.8.17;

interface IERC20 {
    //all interface functions must be external beacuse it will be called from another contract
    function transfer(address to, uint256 amount) external  returns (bool);
    function balanceOf(address account ) external view returns (uint256);
    event Transfer(address indexed  from ,address indexed  to, uint256 value);
}

contract Faucet {
    address payable owner;
    IERC20 public token;
    uint256 public withdrawlAmount = 50 * (10 **18);
    uint256 public lockTime = 1 minutes;

    event Withdrawl(address indexed to, uint256 indexed amount);
    event Deposit(address indexed from, uint256 amount);

    mapping(address => uint256) nextAccessTime;
    constructor(address tokenAddress) payable{
        token = IERC20(tokenAddress); //token now reperest a contract instance 
        //now we can call methods from ERC20.sol from here
        owner = payable(msg.sender);
    }

    function requestTokens() public {
        require(msg.sender != address(0), "The request must not originate from invalid address!");
        require(token.balanceOf(address(this)) >= withdrawlAmount, "Insufficient balance in faucet!" );// the amount in the contract account must me enough to give tokens
        require(block.timestamp  >= nextAccessTime[msg.sender], "Insufficiet time elapsed since the last withdrawl");
        nextAccessTime[msg.sender] = block.timestamp + lockTime;
        token.transfer(msg.sender, withdrawlAmount);
    }


    receive() external payable{// so the contract can recieve funds
    emit Deposit(msg.sender, msg.value);
    }

    function getBalance() external view returns (uint256){
        return token.balanceOf(address(this));
    }

    function setWithdrawlAmount(uint256 amount) public onlyOwner{
        withdrawlAmount = amount * (10**18);
    }

    function setLockTime(uint256 newLockTime) public onlyOwner{ // takes parameteres as minutes
        lockTime = newLockTime * 1 minutes;
    }


    function withdrawl() external  onlyOwner {
        token.transfer(msg.sender, token.balanceOf(address(this)));
        emit Withdrawl(msg.sender, token.balanceOf(address(this)));
    }
    modifier onlyOwner{
        require(msg.sender == owner, "Restricted to The Owner Of The Contract");
        _;
    }
}