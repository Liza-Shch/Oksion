const db = require('../models/index');

module.exports = class Item  {
    static createItem(item, t) {
        return db.Item.create({
            type: item.type,
            is_work: item.isWork,
            district: item.district,
            address: item.address,
            composition: item.composition,
            note: item.note,
        }, {transaction: t})
    }

    static getItems(type, district, t) {
        let sql = `select * from "Items"`;

        if (type || district) {
            sql += " where";
        } else {
            return db.Item.findAll({
            }, {transaction: t})
        }

        let condType = '';

        if (type) {
            condType += " type = $type and";
        }

        let condDistrict = '';

        if (district) {
            condDistrict += " district = $district;"
        } else {
            condType = condType.replace('and', ';');
        }

        sql += condType;
        sql += condDistrict;
        return db.sequelize.query(sql, {bind: {type: type, district: district}, type: db.sequelize.QueryTypes.SELECT}, {transaction: t})
    }

    static getItemByID(id, t) {
        return db.Item.findOne({
            where: {
                id: id
            }
        }, {transaction: t})
    }

    static updateType(id, type, t) {
        return db.Item.update({
            type: type
        }, {
            returning: true,
            where: {
                id: id
            },
            transaction: t
        })
    }

    static updateWork(id, work, t) {
        return db.Item.update({
            'is_work': work
        }, {
            returning: true,
            where: {
                id: id
            },
            transaction: t
        })
    }

    static updateDistrict(id, district, t) {
        return db.Item.update({
            district: district
        }, {
            returning: true,
            where: {
                id: id
            },
            transaction: t
        })
    }
}