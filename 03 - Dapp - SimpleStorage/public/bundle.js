const contractABI = [
  {
    "inputs": [],
    "name": "data",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_data",
        "type": "string"
      }
    ],
    "name": "setData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getData",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];
const contractAddress = '0x7ae2798fd38f34e3f802b411be1de12c714157a9';
const web3 = new Web3('http://localhost:7545');
// Pointer to the deployed contract in the blockchain
const simpleStorage = new web3.eth.Contract(contractABI, contractAddress);

console.log(simpleStorage);

document.addEventListener('DOMContentLoaded', () => {
  const $setData = document.getElementById('setData');
  const $data = document.getElementById('data');
  let accounts = [];

  web3.eth.getAccounts()
  .then(_accounts => {
    accounts = _accounts;
  });

  console.log(accounts);
  const getData = () => {
    console.log("Get Data Called");
    simpleStorage.methods
      .getData()
      .call()
      .then(result => {
        $data.innerHTML = result;
      })
  };
  getData();

  $setData.addEventListener('submit', e => {
    console.log("Set Data Called");
    // stop reload
    e.preventDefault();
    const data = e.target.elements[0].value;
    simpleStorage.methods
      .setData(data)
      .send({from: accounts[0]})
      .then(getData);
  });
});
