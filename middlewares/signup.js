const db = require('../models/index');
const PERMISSION = require('../config/db.config');

module.exports = class SignUp {
    static checkBodyExist(req, res, next) {
        if (!req.body) {
            res.status(400).send({'message': 'Body is empty'});
            return;
        };

        if(!req.body.email) {
            res.status(400).send({'message': 'Email is empty'});
            return;
        };

        if(!req.body.password) {
            res.status(400).send({'message': 'Password is empty'});
            return;
        }

        if(!req.body.permissions) {
            res.status(400).send({'message': 'Permissions are empty'});
            return;
        };

        next();
    };

    static checkRoleExist(req, res, next) {
        req.body.permissions.forEach((permission) => {
            if (!Object.getOwnPropertyDescriptor(PERMISSION, permission.toUpperCase())) {
                res.status(400).send({'message': `Permission ${permission} is not exist`});
                return;
            }
        });

        next();
    };
};