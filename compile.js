const path = require('path')
const fs = require('fs')
const solc = require('solc')

// store path to EduToken source code
// const eduTokenPath = path.resolve(__dirname, 'contracts', 'EduToken.sol')
const eduTokenPath = path.resolve(__dirname, 'contracts', 'EduToken.sol')
// read content of source code and store in variable
const source = fs.readFileSync(eduTokenPath, 'utf8')

let input = {
  language: 'Solidity',
  sources: {
    'EduToken.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
}

let compiledCode = JSON.parse(solc.compile(JSON.stringify(input)))

let contract = compiledCode.contracts['EduToken.sol']['EduToken']
let dirName = 'bin'

const contractByteCodePath = path.join(dirName, 'EduToken.bin')
fs.writeFileSync(contractByteCodePath, contract.evm.bytecode.object)

const contractAbiPath = path.join(dirName, 'EduToken.abi')
fs.writeFileSync(contractAbiPath, JSON.stringify(contract.abi))
