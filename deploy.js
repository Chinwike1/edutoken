const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')
const { exit } = require('process')

dotenv.config()

// configure env file in production
if (process.env.NODE_ENV === undefined) {
  dotenv.config({ path: './.env' })
}

const goerliTestNetwork = process.env.GOERLI_ENDPOINT
const ethMainnetNetwork = process.env.MAINNET_ENDPOINT

const provider = new HDWalletProvider(
  process.env.WALLET_PHRASE,
  ethMainnetNetwork
  // goerliTestNetwork
)

const web3 = new Web3(provider)

const abiPath = path.resolve(__dirname, 'bin', 'EduToken.abi')
const abi = fs.readFileSync(abiPath, 'utf8')

const byteCodePath = path.resolve(__dirname, 'bin', 'EduToken.bin')
const byteCode = fs.readFileSync(byteCodePath, 'utf8')

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts()
    console.log('Attempting to deploy from account', accounts[0])
    const result = await new web3.eth.Contract(JSON.parse(abi))
      .deploy({
        data: byteCode,
      })
      .send({ from: accounts[0], gas: '1000000' })
    console.log('Contract deployed to ', result.options.address)
    exit(0)
  } catch (error) {
    console.error(error)
    exit(0)
  }
}

deploy()
