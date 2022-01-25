var Web3 = require('web3');
var dotEnv = require('dotenv');
var erc20_abi = require('./erc20ABI');

dotEnv.config();

var provider = process.env.PROVIDER_URL;

var web3 = new Web3(provider);
web3.eth.handleRevert = true;

async function getBal(address) {
    const _balance = await web3.eth.getBalance(address, (err,bal) => {
        return bal;
    })
    const balInEther = await web3.utils.fromWei(_balance,'ether');
    return await balInEther;
}

const usdtTxnHash = "0x2f1c5c2b44f771e942a8506148e256f94f1a464babc938ae0690c6e34cd79190"
const txnHashNoContract = "0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060"


let isIt;
async function returnContractAddress(txn) {
  await web3.eth.getTransactionReceipt(txn,(err,res) => {
    isIt = res.contractAddress;
  })
  return isIt;
}

const balanceOfByte = web3.utils.sha3("balanceOf(address)").substr(2,8);
const totalSupplyByte = web3.utils.sha3("totalSupply()").substr(2,8);
const transferByte = web3.utils.sha3("transfer(address,uint256)").substr(2,8);
const transferFromByte = web3.utils.sha3("transferFrom(address,address,uint256)").substr(2,8);
const approveByte = web3.utils.sha3("approve(address,uint256)").substr(2,8);
const allowanceByte = web3.utils.sha3("allowance(address,address)").substr(2,8);



// console.log(data);

async function isERC20(contractAdd) {
  let checker;
  await web3.eth.getCode(contractAdd,(err,val) => {
    if(val.includes(allowanceByte)){
      checker = true;
    }
    else{
      checker = false;
    }
  })
  return checker;
}

returnContractAddress('0x2f1c5c2b44f771e942a8506148e256f94f1a464babc938ae0690c6e34cd79190').then((val) => {
  if(val != null){
    isERC20(val).then(console.log);
  }
})


// web3.eth.getTransactionReceipt('0xe05e442045c593b47c69afe8fb775783ca2b4ff6fc5df1d069c8464551139094').then(console.log);

// web3.eth.getCode('0xa70e33622d3581b7904a9f81f97748bee3c71086f888e604e1914effeb1ccb79').then(console.log)