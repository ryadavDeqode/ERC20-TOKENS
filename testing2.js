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


let isIt = null;


const balanceOfByte = web3.utils.sha3("balanceOf(address)").substr(2,8);
const totalSupplyByte = web3.utils.sha3("totalSupply()").substr(2,8);
const transferByte = web3.utils.sha3("transfer(address,uint256)").substr(2,8);
const transferFromByte = web3.utils.sha3("transferFrom(address,address,uint256)").substr(2,8);
const approveByte = web3.utils.sha3("approve(address,uint256)").substr(2,8);
const allowanceByte = web3.utils.sha3("allowance(address,address)").substr(2,8);



// console.log(data);

async function isERC20(contractAdd) {
  if(contractAdd == null){
    return false;
  }
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

async function returnContractAddress(txn) {
    await web3.eth.getTransactionReceipt(txn,(err,res) => {
      isIt = res.contractAddress;
    })
    if(isIt != null){
        if(isERC20(isIt)){
            return isIt;
        }
    }
    else{
        return null;
    }
  }

// returnContractAddress('0x2f1c5c2b44f771e942a8506148e256f94f1a464babc938ae0690c6e34cd79190').then((val) => {
//   if(val != null){
//     isERC20(val).then(console.log(val));
//   }
// })

// getERC20ContractAdd('0x2f1c5c2b44f771e942a8506148e256f94f1a464babc938ae0690c6e34cd79190');

// returnContractAddress('0x2f1c5c2b44f771e942a8506148e256f94f1a464babc938ae0690c6e34cd79190').then((val) => {
//   if(isERC20(val)){
//     console.log(val);
//   }
// })
let fin;
async function getAdd(txn) {

  fin = await returnContractAddress(txn).then((val) => {
    if(val == null){
      return null;
    }
    else if(isERC20(val)){
      return val;
    }
    else {
      return null
    }
  })
  return await fin;
}

// getAdd('0x2f1c5c2b44f771e942a8506148e256f94f1a464babc938ae0690c6e34cd79190').then((res) => {
//   if(res != null){
//     console.log(val);
//   }
//   else{
    
//   }
// })

returnContractAddress('0x2f1c5c2b44f771e942a8506148e256f94f1a464babc938ae0690c6e34cd79190').then(console.log)
