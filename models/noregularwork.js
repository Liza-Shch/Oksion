'use strict';
module.exports = (sequelize, DataTypes) => {
  const NoRegularWork = sequelize.define('NoRegularWork', {
    dateStart: DataTypes.DATE,
    dateEnd: DataTypes.DATE,
    type: DataTypes.TEXT,
    work: DataTypes.TEXT,
    workers: DataTypes.ARRAY(DataTypes.STRING)
  }, {});
  NoRegularWork.associate = function(models) {
    // associations can be defined here
    models.Item.hasMany(NoRegularWork, { foreignKey: 'itemId' })
  };
  return NoRegularWork;
};