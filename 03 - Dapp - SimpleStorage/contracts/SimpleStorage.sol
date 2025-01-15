// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.0 <0.9.0;

contract SimpleStorage {
    // stored by default in storage
    string public data;

    // do not use "data" as param name, which will lead to shadow of the declared global variable
    // set method updates the value to the blockchain, hence will initiate a transaction
    function setData(string memory _data) public {
        data = _data;
    }

    // view - keyword that specifies no changes are made to the blockchain data, but only read
    function getData() public view returns (string memory) {
        return data;
    }
}