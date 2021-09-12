// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./StarXERC721Token.sol";

/**
 * ERC721 factory
 */
contract StarXERC721TokenFactory is Ownable {
    using Strings for string;

    /**
     * StarX token create event
     */
    event StarXTokenCreated(
        address _owner,
        address _token,
        string name,
        string symbol,
        string baseTokenURI
    );

    //save the user's  all token address 
    mapping(address => address[]) starXTokens;
    
    // save all tokens
    address[] private allStarXTokens;

    /**
     * @dev user can get one StarX721 mintor for the method
     */
    function createStarX721(string memory _name,string memory _symbol,string memory _baseTokenURI) external returns(address _token){
        StarXERC721Token token = new StarXERC721Token(_name,_symbol,_baseTokenURI,msg.sender);

        address starXToken = address(token);
        starXTokens[msg.sender].push(starXToken);
        allStarXTokens.push(starXToken);

        emit StarXTokenCreated(msg.sender, starXToken, _name, _symbol, _baseTokenURI);
        return starXToken;
    }

    /**
     * @dev Get all StarXTokens for the _owner address
     */
    function getTokensByAddress(address _owner) external view returns(address[] memory){
        return starXTokens[_owner];
    }

    /**
     * @dev Get all StarXTokens
     */
    function getAllStarXTokens() external view returns(address[] memory){
        return allStarXTokens;
    }
}
