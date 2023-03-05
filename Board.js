const {sequelize} = require('./db');
const { Sequelize } = require('sequelize');

let Board = sequelize.define('board', {
    type: Sequelize.STRING,
    description: Sequelize.STRING,
    rating: Sequelize.INTEGER
});

module.exports = {
    Board
};