const SimpleSmartContract = artifacts.require('SimpleSmartContract')

contract('SimpleSmartContract', (accounts) => {

    describe('deploy', () => {
        it('does not return an empty address', async() => {
            const instance = await SimpleSmartContract.deployed();
            console.log('Contract Address: ', instance.address);
            assert.notEqual(instance.address, "");
        });
    });

});