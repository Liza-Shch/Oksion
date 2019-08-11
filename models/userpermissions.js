'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserPermissions = sequelize.define('UserPermissions', {
    user_id: DataTypes.INTEGER,
    permission_id: DataTypes.INTEGER
  }, {});
  UserPermissions.associate = function(models) {
    // associations can be defined here
  };
  return UserPermissions;
};