// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.0 <0.9.0;

contract Crud {

    // Declare a struct
    struct User {
        uint id;
        string name;
    }

    User[] public users;
    uint public nextId = 1;

    function createUser(string memory name) public {
        users.push(User(nextId, name));
        nextId++;
    }

    function readUser(uint id) public view returns (uint userId, string memory name) {
        uint position = findUser(id);
        return (users[position].id, users[position].name); 
    }

    function updateUser(uint id, string memory name) public {
        uint position = findUser(id);
        users[position].name = name;
    }

    function deleteUser(uint id) public {
        uint position = findUser(id);
        delete users[position];
    }

    function findUser(uint id) internal view returns (uint position) {
        for (uint index = 0; index < users.length; index++) {
            if(users[index].id == id) {
                return index;
            }
        }
        revert('User does not exist!');
    }

    function getCount() public view returns(uint count) {
        return users.length;
    }    
}