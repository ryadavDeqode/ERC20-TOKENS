# ERC20-TOKENS  

Please avoid testing.js and testing2.js files!  

Approach :  

1.Go through blocks and get all txn hashes  
2.From txn hashes get those txns which deployed a smart contract  
3.now filter out only those smart contract which are erc20 standard tokens  
4.Fill the database with erc20 token addresses which will be used to get holders  