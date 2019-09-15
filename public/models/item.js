export default class Item {
    constructor(item) {
        this.id = item.id;
        this.type = item.type;
        this.isWork = item.isWork;
        this.district = item.district;
        this.address = item.address;
        this.composition = item.composition;
        this.note = item.note;
    }

    update(item) {
        this.type = item && item.type;
        this.isWork = item && item.isWork;
        this.district = item && item.district;
        this.address = item && item.address;
        this.composition = item && item.composition;
        this.note = item && item.note;
    }

    updateWork(isWork) {
        this.isWork = isWork;
    }

    updateAddress(address) {
        this.address = address;
    }

    updateType(type) {
        this.type = type;
    }

    updateDistrict(district) {
        this.district = district;
    }

    updateComposition(composition) {
        this.composition = composition;
    }
}