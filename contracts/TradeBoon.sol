pragma solidity ^0.5.0;

contract TradeBoon {
  address payable public owner;
  address[27] public temples;
  mapping(address => uint256) public payment;

  constructor() public {
    owner = msg.sender;
  }

  function makeMerit(uint templeId, uint256 _amount) public payable returns (uint) {
    require(msg.value == _amount && msg.value > 0);
    require(templeId >= 0 && templeId <= 26);

    temples[templeId] = msg.sender;

    payment[msg.sender] += msg.value;

    return templeId;
  }
}