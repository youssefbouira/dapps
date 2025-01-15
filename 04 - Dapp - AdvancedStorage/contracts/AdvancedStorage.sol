// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.0 <0.9.0;

contract AdvancedStorage {
    uint[] public ids;

    function add(uint id) public {
        ids.push(id);
    }

    function get(uint index) public view returns (uint) {
        return ids[index];
    }

    // specify memory keyword when using complex types
    function getAll() public view returns (uint[] memory) {
        return ids;
    }

    function length() public view returns (uint) {
        return ids.length;
    }
}