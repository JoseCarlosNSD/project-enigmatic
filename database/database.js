const Sequelize = require('sequelize');

const connection = new Sequelize('enigma', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = connection;