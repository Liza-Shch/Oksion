const db = require('../models/index');

module.exports = class User {
    static createUser(user, t) {
        return db.User.create({
            email: user.email,
            password: user.password
        }, {transaction: t})
    };

    static deleteUserByEmail(email) {
        return db.User.destroy({
            where: {
                email: email
            }
        })
    }

    static getUserByEmail(email) {
        return db.User.findOne({
            where: {
                email: email
            }
        })
    }
}