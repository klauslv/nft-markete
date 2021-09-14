require("dotenv").config;
const { time, expectRevert } = require('@openzeppelin/test-helpers');
const { inTransaction } = require("@openzeppelin/test-helpers/src/expectEvent");
const { assertion } = require("@openzeppelin/test-helpers/src/expectRevert");
const { assert, use } = require("chai");
const StarXERC721Token = artifacts.require("StarXERC721Token");
const StarXERC721TokenFactory = artifacts.require("StarXERC721TokenFactory");

require('chai').use(require('chai-as-promised')).should

contract('StarXERC721Token', (accounts) => {

    let startX721Factory
    let starX721Token
    const [owner, user, buyer] = accounts

    const baseURI = "https://testapi.dikameng.cn/nft?id="
    before(async() => {
        //deploy 721factory
        startX721Factory = await StarXERC721TokenFactory.new()
        console.log('StarX721TokenFactory is deployed to %s', startX721Factory.address)
            //create 721 Contract
        const result = await startX721Factory.createStarX721("test 721token", "StarX", baseURI, { from: owner })
            //get address of the StarX721Token
        let starX721Addr = result.logs[2].args.starXToken
        console.log('StarX721Token is deployed to %s', starX721Addr)
            //get the 721token contract
        starX721Token = await StarX721Token.at(starX721Addr)

        //mint
        await starX721Token.mint(owner, { from: owner })
        await starX721Token.mint(user, { from: user })
        await starX721Token.mint(buyer, { from: buyer })
    })

    describe('Test StarX721factory', async() => {
        it('1st,Get the owner', async() => {
            const owner = await startX721Factory.owner
            assert.equal(owner, accounts[0])
        })
        let firstToken
        it('2st,Get all tokens', async() => {
            const tokens = await startX721Factory.getAllStarXTokens()
            firstToken = tokens[0]
            assert.equal(tokens.length, 1)
        })
        it('3st,Get token from address', async() => {
            const token = await startX721Factory.getTokensByAddress(owner)
            assert.equal(token, firstToken)
        })
    })
    describe('Test StarX721 Token', async() => {
        it('1st test,test the info of the StarX721 token', async() => {
            assert.equal(await starXToken.name(), "test 721token")
            assert.equal(await starXToken.symbol, "StarX")
            let tokenId = starXToken.getCurTokenId()
            assert.equal(await starXToken.tokenURI(tokenId), baseUR + tokenId)
        })

        it('2st test, get the totalSupply', async() => {
            const total = await starX721Token.totalSupply()
            assert.equal(total.toString(), '3')
        })

        it('3st test, approve other', async() => {
            await starXToken.approve(user, 1, { from: owner })
            const approved = await starXToken.getApproved(1)
            assert.equal(user, approved)
        })

        it('4st test, transfer token to other', async() => {
            const balanceOfOwner = await starXToken.balanceOf(owner)
            const balanceOfUser = await starXToken.balanceOf(user)
            await starXToken.safeTransferFrom(owner, user, 1, { from: owner })
            const ownerBalance = await starXToken.balanceOf(owner)
            const userBalance = await starXToken.balanceOf(user)
            assert.equal(balanceOfOwner.sub(ownerBalance), '1')
            assert.equal(userBalance.sub(balanceOfUser), '1')
        })

        it('5st test,the contract can  pause by owner', async() => {
            assert.isFalse(await starXToken.paused())
            await expectRevert(starX721Token.pause({ from: user }), "caller is not the owner")
            await starX721Token.pause({ from: owner })
            assert.isTrue(await starX721Token.paused())
        })

        it('6st test, the contract can not mint when paused', async() => {
            await expectRevert(tarX721Token.mint(owner, { from: owner }), "contact is paused by owner,can not mint")
            await starX721Token.unpause({ from: owner })
        })

        it('7st test,set new baseURI', async() => {
            const newBaseURI = 'https://testapi.ipfs.cn/nft?id='
            await starX721Token.setBaseTokenURI(newBaseURI, { from: owner })
            let curTokenId = starX721Token.getCurTokenId()
            assert.equal(await starX721Token.tokenURI(curTokenId), baseUR + tokenId)
        })

        it('8st test,get token owner of the tokenId', async() => {
            const tokenId = await starX721Token.getCurTokenId()
            await starX721Token.mint(user, { from: user })
            const tokenOwner = await starX721Token.ownerOf(tokenId);
            assert.equal(tokenOwner, user)
        })

        it('9st test, get the balance of the tokenId', async() => {
            const balanceBefore = await starX721Token.balanceOf(user)
            await starX721Token.mint(user, { from: user })
            const balanceAfter = await starX721Token.balanceOf(user)
            assert.equal(balanceAfter.sub(balanceBefore), "1")
        })
    })
})