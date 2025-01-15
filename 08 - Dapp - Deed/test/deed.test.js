const Deed = artifacts.require('Deed');

contract('Deed', (accounts) => {
    var deed;
    before(async() => {
        deed = await Deed.deployed();
    });

    it('should withdraw', async() => {
        const initialBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
        await new Promise(resolve => setTimeout(resolve, 5000));
        await deed.withdraw({from: accounts[0]});
        const finalBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
        assert(finalBalance.sub(initialBalance).toNumber() == 100);
    });

    it('should not withdraw if too early', async() => {
        const deed = await Deed.new(accounts[0], accounts[1], 5, {value: 100});
        try {
            await deed.withdraw({from: accounts[0]});
        } catch(e) {
            assert(e.message.includes('Too early to withdraw'));
            return;
        }
        assert(false);
    });

    it('should not withdraw if caller is not lawyer', async() => {
        const deed = await Deed.new(accounts[0], accounts[1], 5, {value: 100});
        try {
            await new Promise(resolve => setTimeout(resolve, 5000));
            await deed.withdraw({from: accounts[1]});
        } catch(e) {
            assert(e.message.includes('Lawyer only can initiate a withraw'));
            return;
        }
        assert(false);
    });
});