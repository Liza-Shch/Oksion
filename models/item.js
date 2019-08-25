'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    type: DataTypes.CITEXT,
    is_work: DataTypes.BOOLEAN,
    district: DataTypes.CITEXT,
    address: DataTypes.TEXT,
    composition: DataTypes.JSON,
    note: DataTypes.TEXT
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
  };
  return Item;
};