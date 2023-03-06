const {User} = require('./User');
const {Board} = require('./Board');
const {Cheese} = require('./Cheese');

User.hasMany(Board);
Board.hasOne(User);
Board.belongsToMany(Cheese, {through: "cheese_boards"});
Cheese.belongsToMany(Board, {through: "cheese_boards"});

module.exports = {
    Cheese,
    Board,
    User
}
