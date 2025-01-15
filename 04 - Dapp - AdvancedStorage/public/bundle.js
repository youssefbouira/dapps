const contractABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "ids",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "add",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "get",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getAll",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "length",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];
const contractAddress = '0xd278acecddd13fcee868eea6cd096d6b52d310f4';
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
