const SimpleStorage = artifacts.require("SimpleStorage");

contract('SimpleStorage', (accounts) => {
    it('stores value to the blockchain', async() => {
        const instance = await SimpleStorage.deployed();
        await instance.setData('new data stored');
        const storedData = await instance.getData();
        assert.equal('new data stored', storedData);
    });
});