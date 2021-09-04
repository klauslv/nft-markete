// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract StarXERC1155Token is ERC1155,Ownable,Pausable{
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private curTokenId;
    
    //token name
    string public name;
    // token symbol
    string public symbol;
    
    //base uri
    string public baseTokenUri;
    //tokenId  => creator address
    mapping(uint256 => address) public creators;
    //tokenId => totalSupply
    mapping(uint256 => uint256) public _totalSupply;
    
    constructor(string memory _name,string memory _symbol, string memory _baseTokenUri)ERC1155(_baseTokenUri){
        name = _name;
        symbol = _symbol;
        baseTokenUri = _baseTokenUri;
    }

    /**
     * @dev set a new URI for all token Types
     */
    function setBaseTokenURI(string memory _newUri) public onlyOwner{
        baseTokenUri = _newUri;
        _setURI(_newUri);
    }
    

    /**
     * @dev create `amount` tokens for token Id,and assign to *`_toAddress`
     */
    function mint(address _toAddress,uint256 _amount,bytes memory _data) public whenNotPaused{
        require(_amount>0,"wrong amount");
        require(_toAddress != address(0),"_toAddress can not the zero");
        curTokenId.increment();
        _mint(_toAddress,curTokenId.current(),_amount,_data);
        _totalSupply[curTokenId.current()] += _amount;
        creators[curTokenId.current()] = msg.sender;
    }

    /**
     * @dev mint tokens for each amount in `_amounts`
     */
    function mintBatch(address _toAddress, uint256[] memory _amounts, bytes memory _data)public whenNotPaused{
        require(_amounts.length>0,"amoutns must be more than 0");
        require(_toAddress != address(0),"_toAddress can not the zero");
        uint256[] memory tokenIds = new uint256[](_amounts.length);
        for(uint256 i=0;i<_amounts.length;i++){
            curTokenId.increment();
            tokenIds[i] = curTokenId.current();
            _totalSupply[curTokenId.current()] += _amounts[i];
            creators[curTokenId.current()] = msg.sender;
        }
        _mintBatch(_toAddress,tokenIds,_amounts,_data);
    }
    /**
     * @dev total amount of tokens with a given tokenId.
     */
    function totalSupply(uint256 _tokenId) public view virtual returns(uint256){
        return _totalSupply[_tokenId];
    }

    /**
     * @dev Indicates weither any token exists with a given tokenId
     */
    function exists(uint256 _tokenId) public view returns(bool){
        return _totalSupply[_tokenId]>0;
    }

    /**
     * @dev pause the 1155 token
     */
    function pause() public onlyOwner(){
        _pause();
    }
    
    /**
     * @dev unpause the 1155 Token
     */
    function unpause() public onlyOwner(){
        _unpause();
    }
}