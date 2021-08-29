// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract StartXERC721Token is ERC721Enumerable,Ownable{
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    
    Counters.Counter private curTokenId;
    
    address ownerProxyAddress;
    
    constructor(string memory _name,string memory _symbol,address _proxyAddress) ERC721(_name, _symbol){
        ownerProxyAddress = _proxyAddress;
    }
    
    function mintTo(address _to) public onlyOwner{
        curTokenId.increment();
        
        uint256 newTokenId = curTokenId.current();
        _mint(_to,newTokenId);
    }
    
    function baseTokenURI() virtual public pure returns(string memory){}
    
    function getTokenId() public view returns(uint256){
        return curTokenId.current();
    }
    
  function tokenURI(uint256 _tokenId) override public pure returns(string memory){
     return string(abi.encodePacked(baseTokenURI(), Strings.toString(_tokenId)));
  }
}