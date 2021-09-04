// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "../StarXERC721Token.sol";

contract ERC721TokenMock is StarXERC721Token{
    
    constructor() StarXERC721Token("cat","ll","https://testapi.dikameng.cn/nft?id="){}
}