function Person(name, foods) {
    this.name = name;
    this.food = foods;
}

Person.prototype.fetchFaveFoods = function() {
    new Promise((resolve,reject) => {
        // Simulate an API
        setTimeout(() => resolve(this.foods), 2000);
    });
}


describe('mocking learning', () => {
    it('mocks a reg function', () => {
        const fetchDogs = jest.fn();
        fetchDogs('snickers');
        expect(fetchDogs).toHaveBeenCalled();
        expect(fetchDogs).toHaveBeenLastCalledWith('snickers');
        fetchDogs('hugo');
        expect(fetchDogs).toHaveBeenCalledTimes(2);
    });

    it('can create a person', () => {
        const me = new Person('Rich', ['pizza', 'beers']);
        expect(me.name).toBe('Rich');
    });
    
    it('can fetch foods', async () => {
        const me = new Person('Rich', ['pizza', 'beers']);
        // mock the favFoods function 
        me.fetchFaveFoods = jest.fn().mockResolvedValue(['sushi', 'ramen']);
        const favFoods = await me.fetchFaveFoods();
        console.log(favFoods);
        expect(favFoods).toContain('sushi')
        
    })

})