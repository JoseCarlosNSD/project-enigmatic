'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('enigmatic_dbs', [{
      asks: 'Sua mãe sabe que você é gay?',
      answers: 'Sim',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('enigmatic_dbs', null, {});
  }
};
