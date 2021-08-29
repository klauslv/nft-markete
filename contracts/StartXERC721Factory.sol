// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./StartXERC721Token.sol";

contract StartXERC721TokenFactory is Ownable{
    
    mapping(address=>address) newTokens;
    
    address ownerProxyAddress;
    address nftAddress;
    
   
   constructor(address _proxyAddress,address _nftAddress){
       ownerProxyAddress = _proxyAddress;
       nftAddress = _nftAddress;
   }
    
    function mintSatrtX(address _toAddress) external pure returns (address _token){
        // assert(ownerProxyAddress == msg.sender);
        StartXERC721Token token = StartXERC721Token(_toAddress);
        _token = address(token);
    }
}
