import User from "../models/user";

class Store {
    constructor() {
        this.user = new User();
    }

    onUpdateUser(user) {
        this.user.update(user);
        console.log(this.user);
    }
};

export default new Store();