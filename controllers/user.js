const db = require('../models/index');
const bscrypt = require('bcrypt');

module.exports = User = {
    createUser(req, res) {
        const hashPassword = bscrypt.hashSync(req.body.password, bscrypt.genSaltSync(8));
        db.User.create({
            email: req.body.email,
            password: hashPassword
        }).then(user => {
            db.Permission.findAll({
                where: {
                    name: {
                        [db.Sequelize.Op.or]: req.body.permissions.map(permission => permission.toUpperCase())
                    }
                }
            }).then(permissions => {
                user.setPermissions(permissions).then(() => {
                    res.status(201).send({'message': 'User successfully crested!'})
                }).catch(err => {
                    res.status(500).send({'message': `Error in set permissions: ${err}`})
                })
            }).catch(err => {
                res.status(500).send({'message': `Error in find permissions: ${err}`})
            })
        }).catch(err => {
            res.status(500).send({'message': `Error in create User: ${err}`})
        })
    }
}