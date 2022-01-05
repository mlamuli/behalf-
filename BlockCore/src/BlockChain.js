const Block = require('./Block').Block;
const Transaction = require('./Transaction').Transaction;

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

            
            //for mining , you get a mining reward from the system as null 
            const rewardTx = new Transaction(null,mindingRewardAddress,this.miningReward);
            this.pendingTransactions.push(rewardTx);

            let block = new Block(Date.now(),this.pendingTransactions,this.getLatestBlock().hash);

            block.mineBlock(this.difficulty);

            console.log('block was successfully mined');

            this.chain.push(block);

            this.pendingTransactions = [
                new Transaction(null , mindingRewardAddress, this.miningReward)
            ];
    }

    addTransaction( transaction){

        if(!transaction.fromAddress || !transaction.toAddress){
            throw new Error("Transaction must incluse to and from address");
        }

        if(!transaction.isValid()){
            throw new Error("Cannot add invalid transaction to the chain ");
        }
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

            if(!currentBlock.hasValidTransactions()){
                return false;
            }

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


module.exports.BlockChain = BlockChain;