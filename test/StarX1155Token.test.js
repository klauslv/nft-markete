require("dotenv").config;
const { BN, constants, expectRevert } = require('@openzeppelin/test-helpers');
const { inTransaction } = require("@openzeppelin/test-helpers/src/expectEvent");
const { assertion } = require("@openzeppelin/test-helpers/src/expectRevert");
const { default: BigNumber } = require("bignumber.js");
const { assert, use } = require("chai");
const StarXERC1155Token = artifacts.require("StarXERC1155Token");
const StarXERC1155TokenFactory = artifacts.require("StarXERC1155TokenFactory");

require('chai').use(require('chai-as-promised')).should

contract('StarXERC1155Token', (accounts) => {

    let startX1155Factory
    let starX1155Token
    const [owner, user, buyer, test1, test2] = accounts

    const baseURI = "https://testapi.dikameng.cn/nft?id="
    before(async() => {
        //deploy 1155factory
        startX1155Factory = await StarX1155TokenFactory.new()
        console.log('StarX1155TokenFactory is deployed to %s', startX1155Factory.address)
            //create 1155 Contract
        const result = await startX1155Factory.createStarX1155("test 1155token", "StarX", baseURI, { from: owner })
            //get address of the StarX1155Token
        let starX1155Addr = result.logs[2].args.starXToken
        console.log('StarX1155Token is deployed to %s', starX1155Addr)
            //get the 1155token contract
        starX1155Token = await starX1155Token.at(starX1155Addr)

        //mint the 1155 token
        await starX1155Token.mint(owner, 10, { from: owner })
        await starX1155Token.mint(user, 11, { from: user })
        await starX1155Token.mint(buyer, 12, { from: buyer })
    })

    describe('Test StarX1155Factory', async() => {
        it('1st,Get the owner', async() => {
            const owner = await startX1155Factory.owner
            assert.equal(owner, accounts[0])
        })
        it('2st,Get token from address', async() => {
            const tokens = await startX1155Factory.getAllStarXTokens()
            let firstToken = tokens[0]
            const token = await startX1155Factory.getTokensByAddress(owner)
            assert.equal(token, firstToken)
        })
    })
    describe('Test StarX1155 Token', async() => {
        it('1st test,test the info of the StarX1155 token', async() => {
            assert.equal(await starX1155Token.name(), "test 1155token")
            assert.equal(await starX1155Token.symbol(), "StarX")
            let tokenId = starX1155Token.getCurTokenId()
            assert.equal(await starX1155Token.tokenURI(tokenId), baseUR + tokenId)
        })
        it('2st test,get the balance of owner', async() => {
            const amount = starX1155Token.balanceOf(owner)
            assert.equal(amount.toString(), '10')
        })

        it('3st test,get the balance of user', async() => {
            const amount = starX1155Token.balanceOf(user)
            assert.equal(amount.toString(), '11')
        })

        it('4st test,get the balance of buyer', async() => {
            const amount = starX1155Token.balanceOf(buyer)
            assert.equal(amount.toString(), '12')
        })
        it('5st test,appove other', async() => {
            await starX1155Token.setApprovalForAll(test1, true, { from: user })
            const approved = await starX1155Token.isApprovedForAll(owner, test1)
            assert.equal(approved, true)
        })

        it('6st test, transfer token to other', async() => {
            const balanceOfOwner = await starXToken.balanceOf(owner, 1)
            const balanceOfUser = await starXToken.balanceOf(user, 1)
            await starX1155Token.safeTransferFrom(owner, user, 1, 5, '0x0', { from: owner })
            const ownerBalance = await starX1155Token.balanceOf(owner, 1)
            const userBalance = await starXToken.balanceOf(user, 1)
            assert.equal(balanceOfOwner.sub(ownerBalance), '5')
            assert.equal(userBalance.sub(balanceOfUser), '5')
        })
        it('7st test, transfer fail when transfer of token is not own', async() => {
            await expectRevert(starX1155Token.safeTransferFrom(user, buyer, 2, 20, '0x0', { from: owner }),
                'ERC1155 caller is not the owner')
        })

        it('8st test,the contract can  pause by owner', async() => {
            assert.isFalse(await starX1155Token.paused())
            await expectRevert(starX1155Token.pause({ from: user }), "caller is not the owner")
            await starX1155Token.pause({ from: owner })
            assert.isTrue(await starX1155Token.paused())
        })

        it('9st test, the contract can not mint when paused', async() => {
            await expectRevert(starX1155Token.mint(owner, { from: owner }), "contact is paused by owner,can not mint")
            await starX1155Token.unpause({ from: owner })
        })

        it('10st test,set new baseURI', async() => {
            const newBaseURI = 'https://testapi.ipfs.cn/nft?id='
            await starX1155Token.setBaseTokenURI(newBaseURI, { from: owner })
            let curTokenId = starX1155Token.getCurTokenId()
            assert.equal(await starX1155Token.tokenURI(curTokenId), baseUR + tokenId)
        })
        it('11st, mint batch ', async() => {
            const mintAmounts = [new BN(500), new BN(1000), new BN(3000)]
            const tokenId = await starX1155Token.getCurTokenId()
            await starX1155Token.mintBatch(test2, mintAmounts, data, { from: test2 });
            const balance = await starX1155Token.balanceOf(test2, tokenId)
            assert.equal(balance.toString(), '500')
            const balance2 = await starX1155Token.balanceOf(test2, tokenId.add(new BN(1)))
            assert.equal(balance2.toString(), '1000')
            const balance3 = await starX1155Token.balanceOf(customer2, tokenId.add(new BN(2)))
            assert.equal(balance3.toString(), '3000')
        })

        it('12st test, token transfer batch', async() => {
            const tokenAmount = [new BN(100), new BN(110), new BN(120), new BN(130)]
            const tokenId = await starX1155Token.getCurTokenId()
            await starX1155Token.mintBatch(test1, tokenAmount, data)
            const tokenIds = [tokenId, tokenId.add(new BN(1)), tokenId.add(new BN(2)), tokenId.add(new BN(3))]
            await starX1155Token.safeBatchTransferFrom(test1, test2, tokenIds, tokenAmount, data, { from: test1 })
            const totalSupply = await starX1155Token.totalSupply(tokenId)
            assert.equal(totalSupply.toString(), tokenAmount[0].toString())
            expect(await starX1155Token.balanceOf(test2, tokenId)).to.be.bignumber.equal(tokenAmount[0])
            expect(await starX1155Token.balanceOf(test2, tokenIds[1])).to.be.bignumber.equal(tokenAmount[1])
            expect(await starX1155Token.balanceOf(test2, tokenIds[2])).to.be.bignumber.equal(tokenAmount[2])
            expect(await starX1155Token.balanceOf(test2, tokenIds[3])).to.be.bignumber.equal(tokenAmount[3])
        })

        it('13st test, Indicates weither any token exist with a given id', async() => {
            const tokenId = await starX1155Token.getCurTokenId()
            assert.isFalse(await starX1155Token.exists(tokenId))
            await starX1155Token.mint(test2, '99', data, { from: test2 })
            assert.isTrue(await starX1155Token.exists(tokenId))
        })

        it('14st test, token total supply equals balance', async() => {
            const tokenId = await starX1155Token.getCurTokenId()
            const amount = new BN(66)
            await starX1155Token.mint(user, amount, data, { from: user })
            expect(await starX1155Token.totalSupply(tokenId)).to.be.bignumber.equal(amount)
            expect(await starX1155Token.balanceOf(user, tokenId)).to.be.bignumber.equal(amount)
        })
    })
})
