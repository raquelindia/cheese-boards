const {sequelize} = require('./db');
const { Sequelize } = require('sequelize');

let Cheese = sequelize.define('cheese', {
    title: Sequelize.STRING, 
    description: Sequelize.STRING
});

module.exports = {
    Cheese
};