const db = require('../models/index');

module.exports = class Permission {
    static getPermissionsByNames(names) {
        return db.Permission.findAll({
            where: {
                name: {
                    [db.Sequelize.Op.or]: names
                }
            }
        })
    };
}