const Transaction = require('./classes/Transaction');
const Blockchain = require('./classes/Blockchain');

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('4293ce0479ea429d6f84b06aaaa2101badcedf69dd4fc87792a8f3ae916d0c70');
const myWalletAdress = myKey.getPublic('hex');

const hisKey = ec.keyFromPrivate('ba2d726706cf51b3fb8b68ebd05e408e7a5ca38e36c3c9954ddf7e5ec535dc82');
const hisWalletAdress = hisKey.getPublic('hex');

// -----------------------------

const coin = new Blockchain();

console.log('\n Initial mining...');
coin.minePendingTransactions(myWalletAdress);
console.log(`My balance: ${coin.getBalanceOfAddress(myWalletAdress)}`);
console.log(`His balance: ${coin.getBalanceOfAddress(hisWalletAdress)}`);

const tx1 = new Transaction(myWalletAdress, hisWalletAdress, 10);
tx1.signTransaction(myKey);
coin.addTransaction(tx1);

console.log('\n Mining...');
coin.minePendingTransactions(myWalletAdress);
console.log(`My balance: ${coin.getBalanceOfAddress(myWalletAdress)}`);
console.log(`His balance: ${coin.getBalanceOfAddress(hisWalletAdress)}`);


const tx2 = new Transaction(hisWalletAdress, myWalletAdress, 5);
tx2.signTransaction(hisKey);
coin.addTransaction(tx2);

console.log('\n Mining...');
coin.minePendingTransactions(myWalletAdress);
console.log(`My balance: ${coin.getBalanceOfAddress(myWalletAdress)}`);
console.log(`His balance: ${coin.getBalanceOfAddress(hisWalletAdress)}`);
