pragma solidity ^0.5.0;

contract Hodl {
    address payable recipient;
    uint public earliest;
    
    constructor(address payable _recipient, uint fromNow) payable public {
        recipient = _recipient;
        earliest = now + fromNow;
    }
    
    function withdraw() public {
        require(msg.sender == recipient, "Only the recipient can perform this action.");
        require(now >= earliest, "You cannot yet withdraw your holdings.");
        
        recipient.transfer(address(this).balance);
    }
}