// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.0 <0.9.0;

contract EtherWallet {

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function deposit() payable public {
    }

    function send(address payable to, uint amount) public onlyOwner {
        to.transfer(amount);
    }

    function balanceOf() public view returns (uint){
        return address(this).balance;
    }
}