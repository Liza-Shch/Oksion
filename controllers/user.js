const db = require('../models/index');
const bscrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
            .then(() => { return res.status(201).send({status: 'ok', message: `User successfully created!`})})
            .catch((err) => { return res.status(200).send({status:' errer', errors: ['server.error'], message: `${err}`})});
        })
        .catch((err) => { 
            return res.status(200).send({status: 'error', errors: ['server.error'], message: `${err}`});
        });
    };

    static login(req, res) {
        db.sequelize.transaction((t) => {
            return Queries.User.getUserByEmail(req.body.email, t)
            .then(user => {
                if (!user) {
                    return res.status(200).send({status:'error', errors:['user.not_found'], message: `User with email ${req.body.email} does not exist`});
                }
                const passwordIsValid = bscrypt.compareSync(req.body.password, user.password);
                if (!passwordIsValid) {
                    return res.status(200).send({status:'error', errors:['password.not_matched'], message: 'Invalid Password'});
                };

                const token = jwt.sign({userId: user.id}, process.env.SECRET, {expiresIn: '24h'});
                res.status(200).send({status:'ok', accessToken: token});
            })
            .catch((err) => {
                res.status(200).send({status:'error', errors: ['server.error'], message: `${err}`});
            })
        })
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