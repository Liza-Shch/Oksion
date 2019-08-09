const db = require('../models/index');

module.exports = class UserPermissions {
    static deleteUserByID(userID) {
        return db.UserPermissions.destroy({
            where: {
                user_id: userID
            }
        })
    }
}