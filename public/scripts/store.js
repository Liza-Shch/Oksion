import User from "../models/User";
import Permission from "../models/Permission";
import Item from "../models/Item";

class Store {
    constructor() {
        this.user = new User();
        this.permissions = new Permission();
        this.items = [];
    }

    getItems() {
        const clone = JSON.parse(JSON.stringify(this.items));
        return clone;
    }

    getItemByID(id) {
        const item = this.items.find((item) => +item.id === +id);
        return JSON.parse(JSON.stringify(item))
    }

    onUpdateUser(user) {
        this.user.update(user);
    }

    onUpdateItems(items) {
        this.items = items.map((item) => new Item(item))
    }

    onUpdateItem(item) {
        const itemIndex = this.items.findIndex((_item) => item.id === _item.id);
        this.items[itemIndex] = new Item(item);
    }

    onUpdateItemWork({ id, isWork }) {
        const item = this.items.find((item) => +item.id === +id);
        item.updateWork(isWork);
    }
};

export default new Store();