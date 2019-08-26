import User from "../models/user";
import Permission from "../models/permission";
import Item from "../models/item";

class Store {
    constructor() {
        this.user = new User();
        this.permissions = new Permission();
        this.items = {};
    }

    getItems() {
        const clone = Object.assign({}, this.items);
        return clone;
    }

    onUpdateUser(user) {
        this.user.update(user);
        console.log(this.user);
    }

    onUpdateItems(items) {
        items.forEach((item) => {
            if (this.items[item.id]) {
                this.items[item.id].update(item);
            } else {
                this.items[item.id] = new Item(item);
            }
        });
    }
};

export default new Store();