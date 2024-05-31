const Sequelize = require('sequelize');

const connection = new Sequelize('enigma', 'root', 'root', {
  host: '172.17.0.3',
  dialect: 'mysql'
});

module.exports = connection;