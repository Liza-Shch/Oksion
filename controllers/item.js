const db = require('../models/index');
const Queries = require('../queries/index');

module.exports = class Item {
    static createItem(req, res) {
        const item = req.body.item;
        
        db.sequelize.transaction((t) => {
            return Queries.Item.createItem(item, t)
            .then(() => {
                return res.status(200).send({status: "ok", message: `Item is created`});
            })
            .catch((err) => {
                return res.status(200).send({status: "error", errors: ["server.error"], message: `${err}`});
            })
        });
    }

    static getItems(req, res) {
        const type = req.body.type.toUpperCase() !== 'ANY' ? req.body.type : null;
        const district = req.body.district.toUpperCase() !== 'ANY' ? req.body.district : null;
        db.sequelize.transaction((t) => {
            return Queries.Item.getItems(type, district, t)
            .then((items) => {
                return res.status(200).send({ status: "ok", items: items })
            })
            .catch((err) => {
                return res.status(200).send({ status: "error", errors: ["server.error"], message: `${err}` })
            })
        });
    }

    static getItem(req, res) {
        db.sequelize.transaction((t) => {
            return Queries.Item.getItemByID(req.body.item.id, t)
            .then((item) => {
                if (!item) {
                    return res.status(200).send({ status:"error", errors: ["item.not_found"], message: `Item is not found` })
                }
                
                return res.status(200).send({ status: "ok", item: item })
            })
            .catch((err) => {
                return res.status(200).send({ status: "error", errors: ["server.error"], message: `${err}` })
            })
        })
    }

    static updateType(req, res) {
        db.sequelize.transaction((t) => {
            return Queries.Item.updateType(req.body.item.id, req.body.item.type, t)
            .then(([_, [ item ]]) => {
                return res.status(200).send({ status: "ok", item: item })
            })
            .catch((err) => {
                return res.status(200).send({ status: "error", errors: ["server.error"], message: `${err}` })
            })
        })
    }

    static updateWork(req, res) {
        db.sequelize.transaction((t) => {
            return Queries.Item.updateWork(req.body.item.id, req.body.item['is_work'], t)
            .then(([_, [ item ]]) => {
                return res.status(200).send({ status: "ok", item: item })
            })
            .catch((err) => {
                return res.status(200).send({ status: "error", errors: [ "server.error" ], message: `${err}` })
            })
        })
    }

    static updateDistrict(req, res) {
        db.sequelize.transaction((t) => {
            return Queries.Item.updateDistrict(req.body.item.id, req.body.item.district, t)
            .then(([_, [ item ]]) => {
                return res.status(200).send({ status: "ok", item: item })
            })
            .catch((err) => {
                return res.status(200).send({ status: "error", errors: [ "server.error" ], message: `${err}` })
            })
        })
    }

    static updateAddress(req, res) {
        db.sequelize.transaction((t) => {
            return Queries.Item.updateAddress(req.body.item.id, req.body.item.address, t)
            .then(([_, [ item ]]) => {
                return res.status(200).send({ status: "ok", item: item })
            })
            .catch((err) => {
                return res.status(200).send({ status: "error", errors: [ "server.error" ], message: `${err}` })
            })
        })
    }

    static updateNote(req, res) {
        db.sequelize.transaction((t) => {
            return Queries.Item.updateNote(req.body.item.id, req.body.item.note, t)
            .then(([_, [ item ]]) => {
                return res.status(200).send({ status: "ok", item: item })
            })
            .catch((err) => {
                return res.status(200).send({ status: "error", errors: [ "server.error" ], message: `${err}` })
            })
        })
    }
}