const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce).toString();
  }

  mineBlock(difficulty) {
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log(`Block mined: ${this.hash}`);
  }
};

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 5;
  }

  createGenesisBlock() {
    return new Block(0, '14/10/2021', 'Genesis Block', '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length-1];
  }

  addBlock(block) {
    block.previousHash = this.getLatestBlock().hash;
    block.mineBlock(this.difficulty);
    this.chain.push(block);
  }

  isChainValid() {
    for (let i = 1 ; i < this.chain.length ; i++) {
      const previousBlock = this.chain[i-1];
      const currentBlock = this.chain[i];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

const coin = new BlockChain();

console.log('Mining block 1...');
coin.addBlock(new Block(1, '14/10/2021', { amount: 5 }));

console.log('Mining block 2...');
coin.addBlock(new Block(2, '16/10/2021', { amount: 2 }));
