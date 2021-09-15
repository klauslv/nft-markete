const StarX721TokenFactory = artifacts.require("StarXERC721TokenFactory");
module.exports = function(deployer){
    deployer.deploy(StarX721TokenFactory);
}