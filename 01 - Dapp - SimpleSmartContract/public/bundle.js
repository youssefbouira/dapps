const contractABI = [];
const contractAddress = '0x23Bb205bb2AA34446c298f9f415a93fCe46a0720';
const web3 = new Web3('http://localhost:7545');
const simpleSmartContract = new web3.eth.Contract(contractABI, contractAddress);

console.log(simpleSmartContract);

web3.eth.getAccounts()
.then(console.log);