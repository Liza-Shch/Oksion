'use strict';

const fs = require('fs');
const path = require('path');

const cls = require('continuation-local-storage');
const namespace = cls.createNamespace('oksion');
const Sequelize = require('sequelize');
Sequelize.cls = namespace;

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Permission.belongsToMany(db.User, { through: 'UserPermissions', foreignKey: 'permission_id', otherKey: 'user_id'});
db.User.belongsToMany(db.Permission, { through: 'UserPermissions', foreignKey: 'user_id', otherKey: 'permission_id'});
// db.Item.hasMany(db.NoRegularWork);

module.exports = db;
