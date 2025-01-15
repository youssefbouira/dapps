// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.0 <0.9.0;

contract Deed {

    address public lawyer;
    address public beneficiary;
    uint public earliest;

    constructor (
        address _lawyer, 
        address _beneficiary, 
        uint fromNow
        ) payable {
            lawyer = _lawyer;
            beneficiary = _beneficiary;
            earliest = block.timestamp + fromNow;
        }

    function withdraw() public {
        require(msg.sender == lawyer, 'Lawyer only can initiate a withraw');
        require(block.timestamp >= earliest, 'Too early to withdraw');
        payable(beneficiary).transfer(address(this).balance);
    }
}