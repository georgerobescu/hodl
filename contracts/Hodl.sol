pragma solidity ^0.4.25;

contract Hodl {
    address recipient;
    uint public earliest;

    constructor(address _recipient, uint fromNow) public {
        recipient = _recipient;
        earliest = now + fromNow;
    }
    
    function withdraw() public {
        require(msg.sender == recipient, "Only the recipient can perform this action.");
        require(now >= earliest, "You cannot yet withdraw your holdings.");
        
        recipient.transfer(address(this).balance);
    }
}