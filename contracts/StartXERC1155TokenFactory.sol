// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./StartXERC1155Token.sol";

contract StartXERC1155TokenFactory is Ownable{
    using Strings for string;
    using SafeMath for uint256;
    
    string internal constant  baseMetadataURI = "https://creatures-api.opensea.io/api/";
    
    address ownerProxyAddress;
    address ntfAddress;
    
    constructor(address _proxyAddress,address _nftAddress){
        ownerProxyAddress = _proxyAddress;
        ntfAddress = _nftAddress;
    }
    
    function uri(uint256 _optionId) external pure returns(string memory){
        return string(abi.encodePacked(baseMetadataURI,"factory/",Strings.toString(_optionId)));
    }
    
    function mint(uint256 _optionId,address _toAddress,uint256 _amount,bytes calldata _data)external{
       StartXERC1155Token token = StartXERC1155Token(ntfAddress);
       token.mint(_toAddress,_optionId,_amount,_data);
    }
}