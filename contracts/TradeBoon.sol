pragma solidity ^0.5.0;

contract TradeBoon {
  address payable public owner;
  mapping(address => uint256) public payment;

  constructor() public {
    owner = msg.sender;
  }

  function makeMerit(uint256 _amount) public payable  {
    require(msg.value == _amount && msg.value > 0);

    payment[msg.sender] += msg.value;
  }

  function getBalance() public view returns (uint256) {
    return address(this).balance;
  }
}