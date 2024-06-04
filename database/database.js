const Sequelize = require('sequelize');

const connection = new Sequelize('enigma', 'root', 'root', {
  host: '10.0.0.3',
  dialect: 'mysql',
  
});

module.exports = connection;