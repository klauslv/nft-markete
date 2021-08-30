// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

/**
 * ERC721 interface
 */
interface IFactoryERC721 {
    /**
     * returns name of ERC721
     */
    function name() external view returns(string memory);
    
    /**
     * returns the symbol of the ERC721
     */
    function symbol() external view returns(string memory);
    
    /**
     * returns whether can be minted
     */
    function canMintStartX() external view returns (bool);
    
    /**
     * mint startx
     * @param _toAddress address of the owmer
     */
    function mintStartX(address _toAddress) external;
    
    
}