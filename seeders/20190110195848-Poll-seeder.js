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
      },
      {
        name: 'First Poll',
        description: "This is our first poll check",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Second Poll',
        description: "This is our second poll Check, for ipsum generator sefarsbgkhf argiuhrlgrli 23456thfxb bief 345yfbvf",
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
