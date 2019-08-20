const db = require('../models/index');
const PERMISSION = require('../config/db.config');

module.exports = class SignUp {
    static checkBodyExist(req, res, next) {
        if (!req.body) {
            res.status(200).send({status: 'error', errors:['request.empty_body'], message: 'Body is empty'});
            return;
        };

        if(!req.body.email) {
            res.status(200).send({status: 'error', errors:['request.empty_body'], message: 'Email is empty'});
            return;
        };

        if(!req.body.password) {
            res.status(200).send({status: 'error', errors:['request.empty_body'], message: 'Password is empty'});
            return;
        }

        if(!req.body.permissions) {
            res.status(200).send({status: 'error', errors:['request.empty_body'], message: 'Permissions are empty'});
            return;
        };

        next();
    };

    static checkRoleExist(req, res, next) {
        req.body.permissions.forEach((permission) => {
            if (!Object.getOwnPropertyDescriptor(PERMISSION, permission.toUpperCase())) {
                res.status(200).send({status: 'error', errors:['permission.not_found'], message: `Permission ${permission} is not exist`});
                return;
            }
        });

        next();
    };
};