var Web3 = require('web3');
var dotEnv = require('dotenv');
var erc20_abi = require('./erc20ABI');

let abi = erc20_abi.getERC20ABI();

dotEnv.config();

var provider = process.env.PROVIDER_URL;

var web3 = new Web3(provider);
web3.eth.handleRevert = true;

// console.log(erc20_abi);
const NameContract = new web3.eth.Contract(abi, '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48');

NameContract.methods.name().call().then(console.log);