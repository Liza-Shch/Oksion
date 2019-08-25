'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        allowNull: false,
        type: Sequelize.CITEXT
      },
      is_work: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      district: {
        allowNull: false,
        type: Sequelize.CITEXT
      },
      address: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      composition: {
        allowNull: false,
        type: Sequelize.JSON
      },
      note: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Items');
  }
};