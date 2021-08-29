// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "../StartXERC1155Token.sol";

contract ERC1155TokenMock is StartXERC1155Token{
    
    constructor() StartXERC1155Token("1155 cat","1155","https://testapi.dikameng.cn/nft?id="){}
    

}