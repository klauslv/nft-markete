// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract StartXERC1155Token is ERC1155,Ownable{
    using SafeMath for uint256;
    
    string public name;
    string public symbol;
    
    mapping(uint256 => address) public creators;
    mapping(uint256 => uint256) public totalSupply;
     // https://testnets.opensea.io/assets/0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656/26898334845783173942760820433732673078929379099078414231701581014057365798913/
    
    constructor(string memory _name,string memory _symbol, string memory _uri)ERC1155(_uri){
        name = _name;
        symbol = _symbol;
    }
    
       modifier createOnly(uint256 _id){
        require(creators[_id] == msg.sender,"only_creator_allow");
        _;
    }
    
    function setURI(string memory _newUri) public onlyOwner{
        _setURI(_newUri);
       
    }
    
    function mint(address _to,uint256 _id, uint256 _count,bytes memory _data) virtual public createOnly(_id){
        _mint(_to,_id,_count,_data);
        totalSupply[_id] = totalSupply[_id].add(_count);
    }
    
    function batchMint(address _to,uint256[] memory _ids,uint256[] memory _counts,bytes memory _data)public{
        for(uint256 i=0; i<_ids.length;i++){
            uint256 _id = _ids[i];
            uint256 _count = _counts[i];
            totalSupply[_id] = totalSupply[_id].add(_count);
        }
        _mintBatch(_to,_ids,_counts,_data);
    }

    function create(address _owner,uint256 _id,uint256 _totalSupply,string memory uri,bytes memory _data) public onlyOwner returns (uint256){
        creators[_id] = msg.sender;
        _mint(_owner,_id,_totalSupply,_data);
        totalSupply[_id] = _totalSupply;
        return _id;
    }
    
 
}