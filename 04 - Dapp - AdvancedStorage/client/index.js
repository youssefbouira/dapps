import Web3 from 'web3';
import AdvancedStorage from '../build/contracts/AdvancedStorage.json';

// Instance variables
var web3;
var advancedStorage;

// Initialize web3
const initWeb3 = () => {
    return new Promise((resolve, reject) => {
        // Case 1: new metamask is present
        if(typeof window.ethereum !== 'undefined') {
            const web3 = new Web3(window.ethereum);
            console.log('window.ethereum');
            window.ethereum.enable()
                .then(() => {
                    resolve(
                        new Web3(window.ethereum)
                )
                .catch(e => {
                    reject(e)
                });
                return;
            });
        }
        // Case 2: old metamask is present
        if(typeof window.web3 !== 'undefined') {
            console.log('window.web3');
            return resolve(
                new Web3(window.web3.currentProvider)
            );
        }
        // Case 3: no metamask present, connect to ganache
        console.log('ganache');
        resolve(new Web3('http://localhost:7545'));
    });
};

// Initialize contract
const initContract = () => {
    const deploymentKey = Object.keys(AdvancedStorage.networks)[0];
    console.log(deploymentKey);
    return new web3.eth.Contract(
        AdvancedStorage.abi,
        AdvancedStorage.networks[deploymentKey].address
    );
};

// Initialize app

const initApp = () => {
    const $addData = document.getElementById('addData');
    const $data = document.getElementById('data');

    let accounts = [];
    web3.eth.getAccounts()
        .then(_accounts => {
            accounts = _accounts;
            console.log(accounts);
            return advancedStorage.methods.getAll().call({from: accounts[0]});
        })
        .then(result => {
            $data.innerHTML = result.join(', ');
        });

    $addData.addEventListener('submit', e => {
        e.preventDefault();
        const data = e.target.elements[0].value;
        console.log(data);
        console.log(accounts[0]);
        advancedStorage.methods.add(data).send({from: accounts[0]})
        .then(result => {
            console.log('added data to array');
            return advancedStorage.methods.getAll().call();
        })
        .then(result => {
            console.log('data from array', result);
            $data.innerHTML = result.join(', ');
        });
    });
};

document.addEventListener('DOMContentLoaded',() => {
    console.log('DOMContentLoaded');
    initWeb3()
        .then(_web3 => {
            web3 = _web3;
            advancedStorage = initContract();
            initApp();
        })
        .catch(e => console.log(e.message));
});
