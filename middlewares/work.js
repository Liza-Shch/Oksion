module.exports = class Item {
    static checkBodyExist(req, res, next) {
        if (!req.body) {
            return res.status(200).send({ status: 'error', errors: [ 'request.empty_body' ], message: 'Body is empty' })
        }

        next();
    }

    static checkWorkExist(req, res, next) {
        if (!req.body.work) {
            return res.status(200).send({ status: 'error', errors: [ 'work.not_found' ], message: 'Work is not found' })
        }

        next();
    }
}