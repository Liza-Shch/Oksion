const PERMISSION = require('../config/db/permission');

module.exports = class SignUp {
    static checkBodyExist(req, res, next) {
        if (!req.body) {
            return res.status(200).send({status: 'error', errors:['request.empty_body'], message: 'Body is empty'});
        };

        if(!req.body.email) {
            return res.status(200).send({status: 'error', errors:['request.empty_body'], message: 'Email is empty'});
        };

        if(!req.body.password) {
            return res.status(200).send({status: 'error', errors:['request.empty_body'], message: 'Password is empty'});
        }

        if(!req.body.permissions) {
            return res.status(200).send({status: 'error', errors:['request.empty_body'], message: 'Permissions are empty'});
        };

        next();
    };

    static checkRoleExist(req, res, next) {
        req.body.permissions.forEach((permission) => {
            if (!Object.getOwnPropertyDescriptor(PERMISSION, permission.toUpperCase())) {
                return res.status(200).send({status: 'error', errors:['permission.not_found'], message: `Permission ${permission} is not exist`});
            }
        });

        next();
    };
};