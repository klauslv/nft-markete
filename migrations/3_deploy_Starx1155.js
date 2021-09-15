/*
 * @Descripttion: 
 * @version: 
 * @Author: lvming
 * @Date: 2021-09-15 11:22:01
 * @LastEditTime: 2021-09-15 11:40:30
 */
const StarX1155TokenFactory = artifacts.require("StarXERC1155TokenFactory");
module.exports = function(deployer) {
    deployer.deploy(StarX1155TokenFactory);
}