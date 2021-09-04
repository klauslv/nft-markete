// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * ERC721 Token 
 */
contract StarXERC721Token is ERC721Enumerable,Ownable,Pausable{
    using Strings for uint256;
    using Counters for Counters.Counter;
    
    //the curTokenId
    Counters.Counter private idCounts;

    //token URI prefix
    string private baseTokenURI;
    
    //save token creators
    mapping(uint256 => address) creators;
    
    constructor(string memory _name,string memory _symbol,string memory _baseTokenURI) ERC721(_name, _symbol){
        baseTokenURI = _baseTokenURI;
    }
    /**
     * @dev set one new base URI only by owner
     * @param _newTokenURI a new base URI
     */
    function setBaseTokenURI(string memory _newTokenURI) public onlyOwner{
        baseTokenURI = _newTokenURI;
    }
    /**
     * @dev set base URI for ERC721
     */
    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }
    /**
     * @dev return current base URI
     */
    function getbaseTokenURI() virtual public view returns(string memory){
        return baseTokenURI;
    }
    /**
     * @dev user can mint one 721 Token for _toAddress
     * @param _toAddress owner of the ERC721 Token 
     */
    function mintTo(address _toAddress) public {
        //id increment every time a mint
        curTokenId.increment();
        _safeMint(_toAddress,curTokenId.current());
        creators[curTokenId.current()] = msg.sender;
    }
    /**
     * @dev returns the curren token Id for the contract 
     */
    function getCurTokenId() public view returns(uint256){
        return curTokenId.current();
    }
    
    /**
     * @dev returns current token URI for the contract
     */
    function getCurTokenURI() public view returns(string memory){
        return tokenURI(curTokenId.current());
    }
    
    /**
     * @dev get token URI by _tokenId
     */
    function tokenURI(uint256 _tokenId) override public view returns(string memory){
     return string(abi.encodePacked(baseTokenURI, _tokenId.toString()));
  }

  /**
   * @dev exists _tokenId
   */
  function exists(uint256 _tokenId) public view returns(bool){
      return _exists(_tokenId);
  }

  /**
   * @dev pause the 721Token 
   */
  function pause() external onlyOwner{
      _pause();
  }

  /**
   * @dev unPause the 721Token 
   */
  function unPause() external onlyOwner{
      _unpause();
  }

}