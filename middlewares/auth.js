const jwt = require('jsonwebtoken');

module.exports = class Auth {
    static isAuth(req, res, next) {
        const regExp = new RegExp('x-access-token=(.+);');
        const cookie = regExp.exec(req.headers.cookie);
        if (!cookie) {
            return res.status(200).send({status:'error', errors: ['user.not_auth'], message: `User is not authenticated`});
        }
        const accessToken = cookie.slice(1,).join();
        if (!accessToken) {
            return res.status(200).send({status:'error', errors: ['user.not_auth'], message: `User is not authenticated`});
        };

        jwt.verify(accessToken, process.env.SECRET, (err, token) => {
            if (err) {
                return res.status(200).send({status:'error', errors: ['user.not_auth'], message: `${err}`});
            };

            console.log(token);
            req.userId = token.userId;
        });

        next();
    };

    static determinePermissions(req, res, next) {
        const regExp = new RegExp('x-permissions-token=(.+)');
        const cookie = regExp.exec(req.headers.cookie);
        if (!cookie) {
            return res.status(200).send({status:'error', errors:['user.denied'], message: `User has not permissions`});
        }
        const permissionsToken = cookie.slice(1,).join();
        if (!permissionsToken) {
            return res.status(200).send({status:'error', errors:['user.denied'], message: `User has not permissions`});
        }

        jwt.verify(permissionsToken, process.env.SECRET, (err, token) => {
            if (err) {
                return res.status(200).send({status: 'error', errors: ['user.denied'], message: `${err}`});
            };

            req.permissions = token.permissions;
        });

        next();
    }
}