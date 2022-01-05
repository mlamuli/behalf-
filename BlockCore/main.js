const SH256 = require('crypto-js/sha256');

class Transaction{
    constructor(fromAddress , toAddress ,amount){
        this.fromAddress = fromAddress ;
        this.toAddress = toAddress ;
        this.amount =  amount
    }
}


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
}



class BlockChain {
    
    constructor(){
        this.chain =  [this.createGenesisBlock()] ;
        this.difficulty = 2 ;
        this.pendingTransactions = [] ;
        this.miningReward = 100 ;
    }

    createGenesisBlock( ){
        return new Block(0,'01/01/2022','Genesis Block','0') ;
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    minePandingTransactions(mindingRewardAddress){
            let block = new Block(Date.now(),this.pendingTransactions);

            block.mineBlock(this.difficulty);

            console.log('block was successfully mined');

            this.chain.push(block);

            this.pendingTransactions = [
                new Transaction(null , mindingRewardAddress, this.miningReward)
            ];
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(addess){
        let balance = 0 ;

        for(const _block of this.chain){
            for(const _trans of _block.transactions){
                if(_trans.fromAddress === addess){
                    balance -= _trans.amount ;
                }
                if(_trans.toAddress === addess){
                    balance += _trans.amount ;
                }
            }
        }

        return balance
      
    }

    isChainValid(){
        for(let i = 1 ;i < this.chain.length ;i++){
            const  currentBlock = this.chain[i] ;
            const  previousBlock = this.chain[i - 1] ; 

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false ;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false ;
            }
        }

        return true;
    }
}


// tests
let zonCoin = new BlockChain() ;

zonCoin.createTransaction(new Transaction('address1','address2',100));
zonCoin.createTransaction(new Transaction('address2','address1',50));

console.log('\n Starting miner ...') ;
zonCoin.minePandingTransactions('mla-address');

console.log('balance of mla is '+ zonCoin.getBalanceOfAddress('mla-address'));

console.log('\n Starting miner ...') ;
zonCoin.minePandingTransactions('mla-address');

console.log('balance of mla is '+ zonCoin.getBalanceOfAddress('mla-address'));
