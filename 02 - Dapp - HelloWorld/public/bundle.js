const contractABI = [
    {
        "inputs": [],
        "name": "hello",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "pure",
        "type": "function",
        "constant": true
      }
];
const contractAddress = '0x5C3c7601A33c51C5BFf6f5AD07Aa0c370c272877';
const web3 = new Web3('http://localhost:7545');
// Pointer to the deployed contract in the blockchain
const helloWorld = new web3.eth.Contract(contractABI, contractAddress);

console.log(helloWorld);

document.addEventListener('DOMContentLoaded', () => {
    helloWorld.methods.hello().call()
    .then(result => {
        document.getElementById('hello').innerHTML = result;
    });
});
