'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      // Add altering commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:
      return queryInterface.bulkInsert('Polls', [{
        name: 'John Doe',
        description: "John Doe",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Fish',
        description: "Fish",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Chicken',
        description: "Chicken",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
