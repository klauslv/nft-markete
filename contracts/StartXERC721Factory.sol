// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./StartXERC721Token.sol";
import "./IFactoryERC721.sol";

contract StartXERC721TokenFactory is Ownable, IFactoryERC721 {
    using Strings for string;
    
    mapping(address=>address) newTokens;
    
    address nftAddress;
    
   constructor(address _nftAddress){
       nftAddress = _nftAddress;
   }
    
    function mintStartX(address _toAddress) override public{
        // assert(ownerProxyAddress == msg.sender);
        require(canMintStartX());
        StartXERC721Token token = StartXERC721Token(_toAddress);
        address _token = address(token);
        newTokens[_toAddress] = _token;
    }
    
    function canMintStartX() override public view returns(bool){
        return true;
    }
    
    function name() override external pure returns (string memory){
        return "StartX";
    }
    
    function symbol() override external pure returns (string memory){
        return "";
    }
}
