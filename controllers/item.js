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
                return res.status(200).send({status: "ok", items: items})
            })
            .catch((err) => {
                return res.status(200).send({status: "error", errors: ["server.error"], message: `${err}`})
            })
        });
    }
}