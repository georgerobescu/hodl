pragma solidity ^0.5.0;

contract Hodl {
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
    
    user.earliest = now + fromNow;
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
  
  function getUser(address _user) view public returns(uint, uint, bool) {
    return(users[_user].earliest, users[_user].amount, users[_user].hodler);
  }
}