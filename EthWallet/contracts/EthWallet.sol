// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract EthWallet {
  address payable public owner;
  constructor()  {
    owner = payable(msg.sender);
  }

  receive() external payable{}
  fallback()  external payable{}
  function withdrawETH(uint _amount) public{
    require(msg.sender == owner, "Only the owner can withdraw from this wallet!");
    payable(msg.sender).transfer(_amount);
  }
  
  function getBalance() external view returns (uint){
    return address(this).balance;
  }
}
