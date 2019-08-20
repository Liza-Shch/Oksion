const db = require('../models/index');

module.exports = class UserPermissions {
    static getPermissionsByUserID(userID) {
        return db.sequelize.query(`
        select name
        from (
            select up.permission_id as p_id
            from (
                select u.id as user_id
                from "Users" as u
                where u.id = $userID
            ) as users
            join "UserPermissions" as up on up.user_id = users.user_id
        ) as user_permissions
        join "Permissions" as p on p.id = user_permissions.p_id; 
        `, { bind: {userID : userID}, type: db.sequelize.QueryTypes.SELECT})
    }

    static deleteUserByID(userID) {
        return db.UserPermissions.destroy({
            where: {
                user_id: userID
            }
        }, {transaction: t})
    }
}