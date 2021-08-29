// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "../StartXERC721Token.sol";

contract ERC721TokenMock is StartXERC721Token{
    
    constructor(address _proxyAddress) StartXERC721Token("cat","ll",_proxyAddress){}
    
    function baseTokenURI() override pure public returns(string memory){
        return "https://testapi.dikameng.cn/nft?id=";
    }
}