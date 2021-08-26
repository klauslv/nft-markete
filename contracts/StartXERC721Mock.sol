// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract StartXERC721Mock is ERC721Enumerable{
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    
    
    Counters.Counter private _tokenId;
    
    constructor(string memory _name,string memory _symbol)ERC721(_name,_symbol){
        _tokenId.increment();
        
        uint256 newTokenId = tokenId.current();
        
    }
    
    function mint(address to,uint256 tokenId) public{
        _mint(to,tokenId);
    }
        
    
}