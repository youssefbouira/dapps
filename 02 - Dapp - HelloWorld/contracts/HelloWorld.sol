// SPDX-License-Identifier: UNLICNESED

pragma solidity >=0.7.0 <0.9.0;

contract HelloWorld {
    
    /*
    public - visibility identifier
    pure - specifies function as read-only and refers to a static response in return 
    memory - temporary variable stored in memory
    */
    function hello() public pure returns (string memory){
        return "Hello, World!";
    }
}