const db = require('../models/index');
const bscrypt = require('bcrypt');
const Queries = require('../queries/index');

module.exports = class User {
    static createUser(req, res) {
        const hashPassword = bscrypt.hashSync(req.body.password, bscrypt.genSaltSync(8));
        
        Queries.Permission.getPermissionsByNames(req.body.permissions.map(permission => permission.toUpperCase()))
        .then((permissions) => {
            db.sequelize.transaction({autocommit: false}, (t) => {
                return Queries.User.createUser({email: req.body.email, password: hashPassword}, t)
                .then(user => {
                    return user.setPermissions(permissions)
                })
            })
            .then(() => { return res.status(201).send({'message': `User successfully created!`})})
            .catch((err) => { return res.status(500).send({'message': `${err}`})});
        })
        .catch((err) => { 
            return res.status(500).send({'message': `${err}`});
        });
    };

    // static deleteUser(req, res) {
    //     Queries.User.getUserByEmail(req.body.email)
    //     .then(user => {
    //         Queries.UserPermissions.deleteUserByID(user.id)
    //         .then(() => {
    //             Queries.User.deleteUserByEmail(user.email)
    //             .then(() => {
    //                 res.status(200).send({'message': `User successfully deleted!`})
    //             })
    //             .catch((err) => {
    //                 res.status(500).send({'message': `Error in delete User: ${err}`})
    //             })
    //         })
    //         .catch((err) => {
    //             res.status(500).send({'message': `Error in delete User Permissions: ${err}`})
    //         })
    //     })
    //     .catch((err) => {
    //         res.status(500).send({'message': `Error User does not exist: ${err}`})
    //     })
    // }
}