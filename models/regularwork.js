'use strict';
const REGULAR_WORK_TYPES = require('../config/db/regularWork');

module.exports = (sequelize, DataTypes) => {
  const RegularWork = sequelize.define('RegularWork', {
    date: DataTypes.DATE,
    type: DataTypes.ENUM(...REGULAR_WORK_TYPES),
    work: DataTypes.TEXT,
    workers: DataTypes.ARRAY(DataTypes.STRING),
  }, {});
  RegularWork.associate = function(models) {
    // associations can be defined here
    models.Item.hasMany(RegularWork, { foreignKey: 'itemId' })
  };
  return RegularWork;
};