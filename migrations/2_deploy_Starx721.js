const StarX721TokenFactory = artifacts.require("StarX721TokenFactory");
module.exports = function(deployer){
    deployer.deploy(StarX721TokenFactory);
}