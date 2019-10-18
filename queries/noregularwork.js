const db = require('../models/index');

module.exports = class NoRegularWork {
    static createWork(work, t) {
        return db.NoRegularWork.create({
            dateStart: new Date(+work.dateOpen),
            dateEnd: new Date(+work.dateClose),
            type: work.defectType,
            work: work.note,
            workers: work.workers,
            itemId: work.itemId,
        }, {transaction: t})
    }
}