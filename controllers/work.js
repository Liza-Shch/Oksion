const db = require('../models/index');
const Queries = require('../queries/index');

module.exports = class Work {
    static createWork(req, res) {
        if (req.body.work.type === 'noRegular') {
            return db.sequelize.transaction((t) => {
                return Queries.NoRegularWork.createWork(req.body.work, t)
                .then(() => res.status(200).send({ status: 'ok', message: 'Work is created' }))
                .catch((err) => res.status(200).send({ status: 'error', errors: ['server.error'], message: `${err}` }))
            })
        }

        if (req.body.work.type === 'regular') {
            return db.sequelize.transaction((t) => {
                return Queries.ReqularWork.createWork(req.body.work, t)
                .then(() => res.status(200).send({ status: 'ok', message: 'Work is created' }))
                .catch((err) => res.status(200).send({ status: 'error', errors: ['server.error'], message: `${err}` }))
            })
        }

        return res.status(200).send({ status: 'error', errors: ['work.work_type_not_found'], message: 'Type of work is not found' })
    }
}