# StarX
Ethereum based NFT minter, ERC-721 and ERC-1155 NFT Marketplace project

## 1. Project overview
Discover, collect, and sell extraordinary NFTs

## 2. Development Environment

- Truffle v5.4.9 (core: 5.4.9)
- Solidity - 0.8.7 (solc-js)
- Node v14.17.0
- Web3.js v1.5.2
- Ganache CLI v6.12.2 (ganache-core: 2.13.2) on port 8545
- Ganache GUI v2.5.4 (ganache-core: 2.13.2) on port 7545

The smart contract is deployed and fully tested on the local Ethereum VM.

## 3. File structures

contracts

- token - Leveraging the ERC721 and ERC1155 standard to make your items instantly tradeable on NFT Marketplace  

## 4. Run the project

### 4.1. Clone code and install dependencies

```javascript
git clone this-project-code
```

```javascript
cd /path/to/this/project/folder/
```

Run command to install package dependencies;

```javascript
npm install
```

### 4.2. Run a local blockchain

#### Run Ganache-GUI

I run Ganache GUI on port 7545, as it provides a better view;

Please input the "WORKSPACE NAME" with "StarX" and link "TRUFFLE PROJECTS" to this workspace by adding 'truffle-config.js' file;

If you use Ganache GUI too, make sure to go to "Setting", "Accounts & Keys";

#### Run Ganache-CLI

If you prefer Ganache-CLI, change the port to 8545 in these files
truffle-config.js and .env file's LOCAL_RPC_URL

next, launch ganache-cli with 10 accounts

```javascript
ganache-cli -a 10
```


### 4.3. Compile and Deploy

#### 4.3.1. Compile
You can now compile

```javascript
truffle compile
```

### 4.3.2.
restart Ganache GUI or ganache-cli

### 4.3.3. Deploy
open a new terminal

```javascript
truffle migrate --reset --network <network-name>
```

```
Notice:
<network-name> value range: local, rinkeby, mainnet
```

## 5. Attention
If you want to run the project, you should copy .env.example file and rename it to .env. And if you want to run project on other networks instead of the local development network, you should fill values in .env file, as below:

- LOCAL_RPC_URL, RINKEBY_RPC_URL, MAINNET_RPC_URL --- rpc url, according to the NETWORK you choose
- RINKEBY_ACCOUNT, MAINNET_ACCOUNT --- The account used to deploy the contract
- RINKEBY_MNEMONIC, MAINNET_MNEMONIC --- mnemonic
- ETHERSCAN_API_KEY --- etherscan api key


## 6. Test the project

```javascript
truffle test --network local
```

## 7. Rinkeby deployment

truffle migrate --reset --network rinkeby



## 8. Mainnet deployment

First, estimate the gas fee, see everything is good to go

truffle migrate --dry-run --reset --network mainnet

Second, real deploy

truffle migrate --reset --network mainnet

## 9. Verify

First, go to etherscan, log in your account, get a verify API key

Second, put the key in .env file

Third, run this command, wait, until you see a "Pass..." message on the console

```javascript
truffle run verify <contract-name> --network <network-name>
```