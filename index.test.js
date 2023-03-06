const {sequelize} = require('./db');
const {User, Board, Cheese} = require('./index');



describe('Tests Models', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    })

test('can create a user', async () => {
    const createUser1 = await User.create({ name: 'Raquel', email: "raquelcruz@email.com"});
    


   expect(createUser1.name).toBe("Raquel");
})


test('can create cheese', async () => {
    const createCheese1 = await Cheese.create({ title: "Cheddar", description: "delicious"});



    expect(createCheese1.title).toBe("Cheddar");
})


test('can create a board', async () => {
    const createBoard1 = await Board.create({ type: 'wood', description: 'square', rating: 10});
    


   expect(createBoard1.type).toBe("wood");
})

test('test eager loading', async () =>  {
    const user2 = await User.create({name: "Emily", email: "emily@email.com"});
    const board1 = await Board.create({ type: "wood", description: "tasty", rating: 5});
    const board2 = await Board.create({ type: "wood", description: "salty", rating: 8});
    const cheese2 = await Cheese.create({ title: "pepper jack", description: "spicy"});
    const cheese3 = await Cheese.create({ title: "Swiss", description: "holes"});

    const foundBoard = await Board.findAll({ include: [{model: Cheese, as: "cheeses"}]});
    const foundUser = await User.findAll({ include: [{model: Board, as: "boards" }]});
    const foundCheese = await Cheese.findAll({ include: [{model: Board, as: 'boards'}]});
    
    const boardOne = foundBoard[1];
    console.log(boardOne);
    
    const boardTwo =  foundBoard[2];
    console.log(boardTwo);
    /*
    const cheeseOne = foundCheese[1];
    console.log(cheeseOne);
    */
    const userTwo = foundUser[1];
    console.log(userTwo);
    
    const cheeseTwo = foundCheese[2];
    console.log(cheeseTwo);
    

    await boardTwo.addCheese(cheese2);
    await boardTwo.addCheese(cheese3);
    await cheese2.addBoard(boardOne);
    await cheese2.addBoard(boardTwo);
    await user2.addBoard(boardOne);
    await user2.addBoard(boardTwo);
    await boardOne.addCheese(cheese2);
    await boardOne.addCheese(cheese3);

   
    

    const getUser2Boards = await user2.getBoards();
    const getCheese2Boards = await cheese2.getBoards();
    const getBoard1Cheese = await board1.getCheeses();
    const getBoard2Cheese = await board2.getCheeses();

    const loadedUser = await User.findOne({
        where: {
            id: userTwo.id
        },
        include: Board
    })

    const loadedCheese = await Cheese.findOne({
        where: {
            id: cheeseTwo.id
        },
        include: Board
    })

//     await user2.setBoards([board1, board2]);
//     await board1.setCheeses([cheese2, cheese3]);
//      await board2.setCheeses([cheese3]);
//     await cheese2.setBoards([board1, board2]);
//     await cheese3.setBoards([board1, board2]);

    
//    console.log(t)
    
   

    
    expect(loadedUser.boards.length).toBe(2);
    expect(loadedCheese.boards.length).toBe(2);
    expect(loadedUser.boards[0].description).toBe("tasty");
    expect(loadedUser.boards[1].description).toBe("salty");
    expect(loadedCheese.boards[1].description).toBe("tasty");
    expect(loadedCheese.boards[0].description).toBe("salty");

    expect(foundUser.length).toBe(2);
    expect(foundCheese.length).toBe(3);
    expect(foundBoard.length).toBe(3);



    

})


 test('test associations', async () => {
     const user2 = await User.create({name: "Emily", email: "emily@email.com"});
    const board1 = await Board.create({ type: "wood", description: "tasty", rating: 5});
    const board2 = await Board.create({ type: "wood", description: "salty", rating: 8});
    const cheese2 = await Cheese.create({ title: "pepper jack", description: "spicy"});
    const cheese3 = await Cheese.create({ title: "Swiss", description: "holes"});
    const foundBoard = await Board.findAll({ include: [{model: Cheese, as: "cheeses"}]});
    const foundUser = await User.findAll({ include: [{model: Board, as: "boards" }]});
    const foundCheese = await Cheese.findAll({ include: [{model: Board, as: 'boards'}]});
   
    await user2.setBoards([board1, board2]);
    await board1.setCheeses([cheese2, cheese3]);
     await board2.setCheeses([cheese3]);
    await cheese2.setBoards([board1, board2]);
    await cheese3.setBoards([board1, board2]);
    
    
    const cheese2TitlePath = foundBoard[2].cheeses[0].title;
    const cheeseTitlePath = foundBoard[1].cheeses[1].title;
    const cheeseDescriptionPath = foundBoard[2].cheeses[1].description;
    const cheeseBoardsPath = foundCheese[1].boards[1].type;
    const cheeseBoardsPath2 = foundCheese[1].boards[1].rating;
    
    expect(cheeseTitlePath).toBe("Swiss");
    expect(cheeseDescriptionPath).toBe("holes");
    expect(cheese2TitlePath).toBe("pepper jack");
    expect(cheeseBoardsPath).toBe("wood");
    expect(cheeseBoardsPath2).toBe(5);

 })
 

})

