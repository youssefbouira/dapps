const AdvancedStorage = artifacts.require('AdvancedStorage');

contract('AdvancedStorage', () => {
    let instance;

    before(async() =>  {
        instance = await AdvancedStorage.deployed();
    });

    describe('array store and retrieval operations', async() => {
        
        it('adds new data to the array', async() => {           
            await instance.add(10);
            const arrayLength = await instance.length();
            assert.equal(1,arrayLength); 
        });

        it('reads data at index from the array', async() => {
            await instance.add(20);
            const valueAtIndexTwo = await instance.get(1);
            assert.equal(20,valueAtIndexTwo); 
        });

        it('returns the array', async() => {
            const arrayFromChain = await instance.getAll();
            const mappedArray = arrayFromChain.map(id => id.toNumber())
            assert.deepEqual([10, 20], mappedArray); 
        });

        it('returns the length of the array', async() => {
            const arrayLength = await instance.length();
            assert.equal(2,arrayLength); 
        });
    }); 
});