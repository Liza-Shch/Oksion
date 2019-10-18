'use strict';
const REGULAR_WORK_TYPES = require('../config/db/regularWork');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RegularWorks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itemId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Items',
          key: 'id'
        }
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM(...REGULAR_WORK_TYPES)
      },
      work: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      workers: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING)
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
    return queryInterface.dropTable('RegularWorks');
  }
};