import User from "../models/user";
import Permission from "../models/permission";

class Store {
    constructor() {
        this.user = new User();
        this.permissions = new Permission();
    }

    onUpdateUser(user) {
        this.user.update(user);
        console.log(this.user);
    }
};

export default new Store();