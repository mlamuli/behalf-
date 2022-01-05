const EC = new require('elliptic').ec ;
const ec = new EC('secp256k1');
const  BlockChain = require('./BlockChain').BlockChain;
const  Transaction = require('./Transaction').Transaction;



const myKey = ec.keyFromPrivate('c40b0435b32442a8e0dd133d38a6ffce6692b3abe99798517c6792784540cae4');
const myWalletAddress = myKey.getPublic('hex');


// tests
let zonCoin = new BlockChain();

const tx1 = new Transaction(myWalletAddress,'someOnesPuplicKey',10);
tx1.signTransaction(myKey);
zonCoin.addTransaction(tx1);



console.log('\n Starting miner ...') ;
zonCoin.minePandingTransactions(myWalletAddress);

console.log('balance of mla is '+ zonCoin.getBalanceOfAddress(myWalletAddress));

console.log('is chain valid ?  '+ zonCoin.isChainValid());

zonCoin.chain[1].transactions[0].amount = 3 ;

console.log('is chain valid ?  '+ zonCoin.isChainValid());