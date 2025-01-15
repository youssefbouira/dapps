const EtherWallet = artifacts.require("EtherWallet");

contract('EtherWallet', (accounts) => {
    var etherWallet;

    before(async() => {
        etherWallet = await EtherWallet.deployed();
    })

    it('has the contract owner addess', async() => {
        const owner = await etherWallet.owner();
        console.log("Contract owner address: ", owner);
        assert.equal(accounts[0], owner);
    })

    it('should deposit ether to wallet', async() => {
        await etherWallet.deposit({
            from: accounts[0],
            value: 100
        });
        const balance = await web3.eth.getBalance(etherWallet.address);
        assert.equal(parseInt(balance),100);
    });

    it('should return balance of the contract', async() => {
        const balance = await etherWallet.balanceOf();
        assert.equal(parseInt(balance),100);
    });

    it('should transfer ether to other address', async() => {
        const recipientBalanceBefore = await web3.eth.getBalance(accounts[1]);
        await etherWallet.send(accounts[1], 50, {from: accounts[0]});
        const walletBalance = await web3.eth.getBalance(etherWallet.address);
        assert.equal(parseInt(walletBalance),50);
        const recipientBalanceAfter = await web3.eth.getBalance(accounts[1]);
        const initialBalance = web3.utils.toBN(recipientBalanceBefore);
        const finalBalance = web3.utils.toBN(recipientBalanceAfter);
        assert(finalBalance.sub(initialBalance).toNumber() === 50);
    });

    it('should not transfer ether to other address when not owner', async() => {
        try{
            await etherWallet.send(accounts[1], 50, {from: accounts[2]});
        } catch(e) {
            assert(e.message !== '');
            return;
        }
        assert(false);      
    });
});