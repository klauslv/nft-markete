require("dotenv").config;
const {time,expectRevert} = require('@openzeppelin/test-helpers');
const { inTransaction } = require("@openzeppelin/test-helpers/src/expectEvent");
const { assertion } = require("@openzeppelin/test-helpers/src/expectRevert");
const { assert } = require("chai");
const StarX721Token  = artifacts.require("StarX721Token");
const StarX721TokenFactory = artifacts.require("StarX721TokenFactory");

require('chai').use(require('chai-as-promised')).should

contract('StarX721Token',(accounts) =>{

    let startX721Factory
    let starX721Token
    const [owner, user, buyer] = accounts

    const baseURI = "https://testapi.dikameng.cn/nft?id="
    before(async()=>{
        //deploy 721factory
        startX721Factory = await StarX721TokenFactory.new()
        console.log('StarX721TokenFactory is deployed to %s',startX721Factory.address)
        //create 721 Contract
        const result = await startX721Factory.createStarX721("test 721token","StarX",baseURI,{from:owner})
        //get address of the StarX721Token
        let starX721Addr = result.logs[2].args.starXToken
        console.log('StarX721Token is deployed to %s',starX721Addr)
        //get the 721token contract
        starX721Token = await StarX721Token.at(starX721Addr)

        //mint
        await starX721Token.mint(owner,{from:owner})
        await starX721Token.mint(user,{from:user})
        await starX721Token.mint(buyer,{from:buyer})
    })

    describe('test StarX721factory', async()=>{
        it('1st,Get the owner',async()=>{
            const owner = await startX721Factory.owner
            assert.equal(owner,accounts[0])
        })
        let firstToken
        it('2st,Get all tokens',async()=>{
            const tokens = await startX721Factory.getAllStarXTokens()
            firstToken = tokens[0]
            assert.equal(tokens.length,1)
        })
    })
})
