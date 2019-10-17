const ITEM_TYPE = require('../config/db/itemType');
const ITEM_DISTRICT = require('../config/db/itemDistrict');

module.exports = Item = {
    checkBodyExist(req, res, next) {
        if (!req.body) {
            return res.status(200).send({status: "error", errors: ["request.empty_body"], message: 'Body is empty'})
        }

        next();
    },

    checkTypeExist(req, res, next) {
        const item = req.body.item;
        if (!item.type || !(item.type.toUpperCase() in ITEM_TYPE)) {
            return res.status(200).send({status: "error", errors: ["item.type.not_found"], message: `Item's type is not found`});
        }

        next();
    },

    checkDistrictExist(req, res, next) {
        const item = req.body.item;
        if (!item.district || !(item.district.toUpperCase() in ITEM_DISTRICT)) {
            return res.status(200).send({status: "error", errors: ["item.district.not_found"], message: `Item's district is not found`});
        }

        next();
    },

    checkTypeOrderExist(req, res, next) {
        if (!req.body.type || !(req.body.type.toUpperCase() in ITEM_TYPE || req.body.type.toUpperCase() == 'ANY')) {
            return res.status(200).send({status: "error", errors: ["item.type.not_found"], message: `Item's type is not found`});
        }

        next();
    },

    checkDistrictOrderExist(req, res, next) {
        if (!req.body.district || !(req.body.district.toUpperCase() in ITEM_DISTRICT || req.body.district.toUpperCase() == 'ANY')) {
            return res.status(200).send({status: "error", errors: ["item.district.not_found"], message: `Item's district is not found`});
        }

        next();
    },

    checkIDExist(req, res, next) {
        const item = req.body.item;
        if (!item || !item.id) {
            return res.status(200).send({ status: "error", errors: ["item.id.not_found"], messasge: `Item's ID is not found`})
        }

        next();
    },

    checkWorkExist(req, res, next) {
        const item = req.body.item;
        if (!item || item['is_work'] === undefined) {
            return res.status(200).send({ status: "error", errors: ["item.work.not_found"], messasge: `Item's work is not found`})
        }

        next();
    },

    checkAddressExist(req, res, next) {
        const item = req.body.item;
        if (!item || item.address === undefined || !item.address) {
            return res.status(200).send({ status: "error", errors: ["item.address.not_found"], messasge: `Item's address is not found`})
        }

        next();
    },

    checkNoteExist(req, res, next) {
        const item = req.body.item;
        if (!item || item.note === undefined) {
            return res.status(200).send({ status: "error", errors: ["item.note.not_found"], messasge: `Item's note is not found`})
        }

        next();
    },

    checkCompositionExist(req, res, next) {
        const item = req.body.item;
        if (!item || item.composition === undefined || !Array.isArray(item.composition) || !item.composition.length) {
            return res.status(200).send({ status: "error", errors: ["item.composition.not_found"], messasge: `Item's composition is not found`})
        }

        const isValid = item.composition.every((part) => {
            if (!part.name) {
                return false
            }

            if (!part.count || part.count.toString().match(new RegExp('\\D')) || !parseInt(part.count, 10)) {
                return false
            }

            return true
        });

        if (!isValid) {
            return res.status(200).send({ status: "error", errors: ["item.composition.not_found"], messasge: `Item's composition is not found`});
        }

        next();
    }
}