const SH256 = require('crypto-js/sha256');
const Transaction = require('./Transaction').Transaction;
const EC = new require('elliptic').ec ;
const ec = new EC('secp256k1');

class Block{

    constructor(timestamp,transactions,previousHash){
        this.timestamp =timestamp ;
        this.transactions = transactions ;
        this.previousHash = previousHash ;
        this.hash  = this.calculateHash() ;
        this.nonce = 0;
    }
  
    calculateHash(){
        return SH256( this.timestamp + JSON.stringify(this.transactions) + this.previousHash + this.nonce ).toString() ;
    }
  
    mineBlock(difficulty){
        while (this.hash.substring(0,difficulty) !==  Array(difficulty + 1).join("0")) {
  
          this.nonce ++ ;
            this.hash = this.calculateHash();
        }
  
        console.log("block mined : "+ this.hash);
    }

    hasValidTransactions(){
        for(const tx of this.transactions){
            if(!tx.isValid()){
                return false;
            }
        }
        return true
    }
  }
  

  module.exports.Block = Block ;