const SplitPayment = artifacts.require('SplitPayment');

contract('SplitPayment', (accounts) => {
    var instance;

    before(async() => {
        instance = await SplitPayment.deployed();
    });

    it('should split payment', async() => {
        const recipients = [accounts[1], accounts[2], accounts[3]];
        const amounts = [40, 20,30];
        const initialBalances = await Promise.all(recipients.map(recipient => {
            return web3.eth.getBalance(recipient)
        }));
        console.log(initialBalances);
        await instance.send(recipients, amounts, {from: accounts[0], value: 90});
        const finalBalances = await Promise.all(recipients.map(recipient => {
            return web3.eth.getBalance(recipient)
        }));
        console.log(finalBalances);
        recipients.forEach((_item, index) => {
            const finalBalance = web3.utils.toBN(finalBalances[index]);
            const initialBalance = web3.utils.toBN(initialBalances[index]);
            assert(finalBalance.sub(initialBalance).toNumber() === amounts[index]);
        });
    });

    it('should not split payment if mismatch in array length', async() => {
        const recipients = [accounts[1], accounts[2], accounts[3]];
        const amounts = [40, 20];
        try {
            await instance.send(recipients, amounts, {from: accounts[0], value: 90});
        } catch(e) {
            assert(e.message.includes('recipients and amount array must be of the same length'));
            return;
        }       
        assert(false);
    });

    it('should not split payment if not initiated by owner', async() => {
        const recipients = [accounts[1], accounts[2], accounts[3]];
        const amounts = [40, 20, 30];
        try {
            await instance.send(recipients, amounts, {from: accounts[1], value: 90});
        } catch(e) {
            assert(e.message.includes('the split payment can be issued only by the owner of the contract'));
            return;
        }       
        assert(false);
    });

});