const SH256 = require('crypto-js/sha256');

class Block{
  constructor(index,timestamp,data,previousHash){
      this.index = index ;
      this.timestamp =timestamp ;
      this.data = data ;
      this.previousHash = previousHash ;
      this.hash  = this.calculateHash() ;

  }

  calculateHash(){
      return SH256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash).toString() ;
  }
}



class BlockChain {
    constructor(){
        this.chain =  [this.createGenesisBlock()] ;
    }

    createGenesisBlock( ){
        return new Block(0,'01/01/2022','Genesis Block','0') ;
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(newblock){
        newblock.previousHash = this.getLatestBlock().hash ;
        newblock.hash  = newblock.calculateHash();
        this.chain.push(newblock);
    }
}



let zonCoin = new BlockChain() ;

zonCoin.addBlock(new Block(1,'02/01/2022',{ amount : 10 }));
zonCoin.addBlock(new Block(2,'03/01/2022',{ amount : 20 }));


console.log(JSON.stringify(zonCoin,null ,4));