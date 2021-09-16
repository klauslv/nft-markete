// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./StarXERC1155Token.sol";

/**
 * StarX ERC1155 token factory
 */
contract StarXERC1155TokenFactory is Ownable{
    using Strings for string;
    using SafeMath for uint256;
    

    /**
     * @dev Emitted when create one 1155 contract
     */
    event StarX1155TokenCreated(
        address owner,
        address token,
        string name,
        string symbol,
        string tokenURI
    );


    //owner=> 1155 token address
    mapping(address => address[]) private starX1155Tokens;

    //all StarX1155 tokens
    address[] private all1155Tokens;

    /**
     * @dev create the 1155 tokens contact
     */
    function createStarX1155(string memory _name,string memory _symbol,string memory _baseTokenUri) external returns(address){
        StarXERC1155Token token = new StarXERC1155Token(_name,_symbol,_baseTokenUri,msg.sender);
        address starX1155 = address(token);
        
        starX1155Tokens[msg.sender].push(starX1155);
        all1155Tokens.push(starX1155);
        emit StarX1155TokenCreated(msg.sender,starX1155,_name,_symbol,_baseTokenUri);
        return starX1155;
    }

    /**
     * @dev returns all token address
     */
    function getAllStarX1155Tokens() external view returns(address[] memory){
        return all1155Tokens;
    }

    /**
     * @dev returns the token address of the `_owner`
     */
    function getTokenByAddress(address _owner) external view returns(address[] memory){
        return starX1155Tokens[_owner];
    }
}