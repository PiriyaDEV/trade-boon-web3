pragma solidity ^0.5.0;

contract TradeBoon {
  /* define structure for temple */
  struct Temple {
    string name;
    string picture;
    string province;
    string region;
    int rating;
    uint256 totalAmount;
  }

  /* define an event interface */
  event AddedTemple(uint256 tid, uint256 timestamp);
  event createTransaction(uint256 tid, uint256 amount, uint256 timestamp);
  
  address payable public owner;
  mapping(address => uint256) public payment;
  mapping(uint256 => Temple) temples;

  /* set contract owner's address */
  constructor() public {
    owner = msg.sender;
  }

  /* this function adds a new temple to temple array */
  function addTemple(
    uint256 _tid,
    string memory _name,
    string memory _picture,
    string memory _province,
    string memory _region,
    int _rating,
    uint256 _timestamp
  ) public {
    temples[_tid] = Temple({
        name: _name,
        picture: _picture,
        province: _province,
        region: _region,
        rating: _rating,
        totalAmount: 0
    });

    /* emit add temple event */
    emit AddedTemple(_tid, _timestamp);
  }

  /* this function return a temple data by id */
  function getTemple(uint256 _tid) public view returns (
    string memory name,
    string memory picture,
    string memory province,
    string memory region,
    int rating,
    uint256 totalAmount
  ) {
    Temple memory temple = temples[_tid];

    return (
      temple.name, 
      temple.picture, 
      temple.province, 
      temple.region, 
      temple.rating, 
      temple.totalAmount
      );
  }

  /* this function makes a transaction to contract onwer and updates temple total received */
  function makeMerit(uint256 _tid, uint256 _amount, uint256 _timestamp) public payable  {
    require(msg.value == _amount && msg.value > 0);

    payment[msg.sender] += msg.value;

    Temple storage temple = temples[_tid];
    temple.totalAmount += msg.value;

    /* emit create transaction event */
    emit createTransaction(_tid, msg.value, _timestamp);
  }

  /* this function return contract owner's current balance */
  function getBalance() public view returns (uint256) {
    return address(this).balance;
  }
}