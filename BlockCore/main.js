const SH256 = require('crypto-js/sha256');

class Block{
  constructor(index,timestamp,data,previousHash){
      this.index = index ;
      this.timestamp =timestamp ;
      this.data = data ;
      this.previousHash = previousHash ;
      this.hash  = this.calculateHash() ;
      this.nonce = 0;
  }

  calculateHash(){
      return SH256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce ).toString() ;
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
    }

    createGenesisBlock( ){
        return new Block(0,'01/01/2022','Genesis Block','0') ;
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(newblock){
        newblock.previousHash = this.getLatestBlock().hash ;
        newblock.mineBlock(this.difficulty);
        this.chain.push(newblock);
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



let zonCoin = new BlockChain() ;

zonCoin.addBlock(new Block(1,'02/01/2022',{ amount : 10 }));
zonCoin.addBlock(new Block(2,'03/01/2022',{ amount : 20 }));


console.log(JSON.stringify(zonCoin,null ,4));


console.log('is zoncoind valid  ? '+ zonCoin.isChainValid());

zonCoin.chain[2].data = { amount: 21 };
zonCoin.chain[2].hash = zonCoin.chain[1].calculateHash();

console.log('is zoncoind valid  ? '+ zonCoin.isChainValid());

console.log(JSON.stringify(zonCoin,null ,4));

