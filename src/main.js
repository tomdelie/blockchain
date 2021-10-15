const Transaction = require('./classes/Transaction');
const Blockchain = require('./classes/Blockchain');

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('049ac5e344df485402a52ef403c67e82d8d0a9d048afd2025130fe23aa9a6285');
const myWalletAdress = myKey.getPublic('hex');

const coin = new Blockchain();

const tx1 = new Transaction(myWalletAdress, 'toPublicKey', 10);
tx1.signTransaction(myKey);
coin.addTransaction(tx1);

console.log('\n Starting the mining...');
coin.minePendingTransactions(myWalletAdress);
console.log(`Balance Tom: ${coin.getBalanceOfAddress(myWalletAdress)}`);
console.log(`Balance TPK: ${coin.getBalanceOfAddress('toPublicKey')}`);
