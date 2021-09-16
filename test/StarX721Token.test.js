const StarX721Token = artifacts.require("StarXERC721Token");
const StarX721TokenFactory = artifacts.require("StarXERC721TokenFactory");
require("dotenv").config;
const { time, expectRevert } = require('@openzeppelin/test-helpers');
const { inTransaction } = require("@openzeppelin/test-helpers/src/expectEvent");
const { assertion } = require("@openzeppelin/test-helpers/src/expectRevert");
const { assert, use } = require("chai");

require('chai').use(require('chai-as-promised')).should()

contract('StarXERC721Token', (accounts) => {

    let startX721Factory
    let starX721Token
    const [owner, user, buyer] = accounts

    const baseURI = "https://testapi.dikameng.cn/nft?id="
    before(async() => {
        //deploy 721factory
        startX721Factory = await StarX721TokenFactory.new()
        console.log('StarX721TokenFactory is deployed to %s', startX721Factory.address)
            //create 721 Contract
        const result = await startX721Factory.createStarX721('test 721token', 'StarX', baseURI, { from: owner })
            //get address of the StarX721Token
        let starX721Addr = result.logs[2].args.token
        console.log('StarX721Token is deployed to %s', starX721Addr)
            //get the 721token contract
        starX721Token = await StarX721Token.at(starX721Addr)

        //mint
        await starX721Token.mintTo(owner, { from: owner })
        await starX721Token.mintTo(user, { from: user })
        await starX721Token.mintTo(buyer, { from: buyer })
    })

    describe('Test StarX721factory', async() => {
        it('1st,Get the owner', async() => {
            const owner = await startX721Factory.owner()
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
            assert.equal(await starX721Token.name(), 'test 721token')
            assert.equal(await starX721Token.symbol(), 'StarX')
            let tokenId = await starX721Token.getCurTokenId()
            assert.equal(await starX721Token.tokenURI(tokenId), baseURI + tokenId.toString())
        })

        it('2st test, get the totalSupply', async() => {
            const total = await starX721Token.totalSupply()
            assert.equal(total.toString(), '3')
        })

        it('3st test, approve other', async() => {
            await starX721Token.approve(user, 1, { from: owner })
            const approved = await starX721Token.getApproved(1)
            assert.equal(user, approved)
        })

        it('4st test, transfer token to other', async() => {
            const balanceOfOwner = await starX721Token.balanceOf(owner)
            const balanceOfUser = await starX721Token.balanceOf(user)
            await starX721Token.safeTransferFrom(owner, user, 1, { from: owner })
            const ownerBalance = await starX721Token.balanceOf(owner)
            const userBalance = await starX721Token.balanceOf(user)
            assert.equal(balanceOfOwner.sub(ownerBalance), '1')
            assert.equal(userBalance.sub(balanceOfUser), '1')
        })

        it('5st test,the contract can  pause by owner', async() => {
            assert.isFalse(await starX721Token.paused())
            await expectRevert(starX721Token.pause({ from: user }), 'caller is not the owner')
            await starX721Token.pause({ from: owner })
            assert.isTrue(await starX721Token.paused())
            await starX721Token.unPause({ from: owner })
        })

        it('6st test,set new baseURI', async() => {
            const newBaseURI = 'https://testapi.ipfs.cn/nft?id='
            await starX721Token.setBaseTokenURI(newBaseURI, { from: owner })
            let curTokenId = await starX721Token.getCurTokenId()
            assert.equal(await starX721Token.tokenURI(curTokenId), newBaseURI + curTokenId.toString())
        })

        it('7st test,get token owner of the tokenId', async() => {
            await starX721Token.mintTo(user, { from: user })
            const tokenId = await starX721Token.getCurTokenId()
            const tokenOwner = await starX721Token.ownerOf(tokenId)
            assert.equal(tokenOwner, user)
        })

        it('8st test, get the balance of the tokenId', async() => {
            const balanceBefore = await starX721Token.balanceOf(user)
            await starX721Token.mintTo(user, { from: user })
            const balanceAfter = await starX721Token.balanceOf(user)
            assert.equal(balanceAfter.sub(balanceBefore), '1')
        })
    })
})