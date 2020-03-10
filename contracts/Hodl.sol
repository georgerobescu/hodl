pragma solidity 0.5.8;

import './lib/SafeMath.sol';

contract Hodl {
  using SafeMath for uint;

  struct User {
    uint earliest;
    uint amount;
    bool hodler;
  }

  mapping(address => User) private users;

  function deposit(uint fromNow, uint _amount) public payable {
    require(msg.value == _amount, 'You must send the correct amount with your transaction.');
    User storage user = users[msg.sender];
    require(user.hodler == false, 'You can only hodl once per account.');

    // 15 second time padding is used to compensate for block.timestamp
    user.earliest = now + fromNow + 15;
    user.amount = _amount;
    user.hodler = true;
  }

  function withdraw() public {
    User storage user = users[msg.sender];

    require(user.hodler == true, "You must be a hodler to make a withdrawal.");
    require(now >= user.earliest, "You cannot yet withdraw your holdings.");

    uint amount = user.amount;

    user.hodler = false;
    user.amount = 0;
    msg.sender.transfer(amount);
  }

  function getUser(address _user) public view returns(uint, uint, bool) {
    return(users[_user].earliest, users[_user].amount, users[_user].hodler);
  }

  function getBalance() public view returns(uint) {
    return address(this).balance;
  }
}