const {sequelize} = require('./db');
const {User, Board, Cheese} = require('./index');



describe('Tests Models', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    })

test('can create a user', async () => {
    const createUser = await User.create({ name: 'Raquel', email: "raquelcruz@email.com"});
    console.log(createUser);
   expect(createUser.name).toBe("Raquel");
})


test('can create cheese', async () => {
    const createCheese = await Cheese.create({ title: "Cheddar", description: "delicious"});

    expect(createCheese.title).toBe("Cheddar");
})


test('can create a board', async () => {
    const createBoard = await Board.create({ type: 'wood', description: 'square', rating: 10});
    
   expect(createBoard.type).toBe("wood");
})

})

