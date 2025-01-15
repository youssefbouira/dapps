const Crud = artifacts.require("Crud");

contract('Crud', () => {
    let instance;

    before(async() => {
        instance = await Crud.deployed();
    });

    it('creates a new user', async () => {
        await instance.createUser('Raja');
        const user = await instance.readUser(1);
        assert(user[0].toNumber() === 1);
        assert(user[1] === 'Raja');        
    });

    it('updates a user name', async() => {
        await instance.updateUser(1, 'Rajapandian');
        const user = await instance.readUser(1);
        assert(user[0].toNumber() === 1);
        assert(user[1] === 'Rajapandian'); 
    });

    it('reverts when updating a non-existing user', async() => {
        try {
            await instance.updateUser(2, 'Rajapandian');
        } catch (e) {
            assert(e.message.includes('User does not exist!'));
            return;
        }
        assert(false);
    });

    it('deletes a user', async() => {
        await instance.deleteUser(1);
        try {
            await instance.readUser(1);
        } catch (e) {
            assert(e.message.includes('User does not exist!'));
            return;
        }
        assert(false);
    })

    it('reverts when deleting a non-existing user', async() => {       
        try {
            await instance.deleteUser(1);
        } catch (e) {
            assert(e.message.includes('User does not exist!'));
            return;
        }
        assert(false);
    })

})