const db = require('../models/index');

module.exports = class RegularWork {
    static createWork(work, t) {
        return db.RegularWork.create({
            date: new Date(+work.date),
            type: work.workType,
            work: work.note,
            workers: work.workers,
            itemId: work.itemId,
        }, {transaction: t})
    }
}