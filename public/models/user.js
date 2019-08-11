export default class User {
    constructor() {
        this._email = null;
    }

    isAuth() {
        return this._email;
    }

    update(user) {
        this._email = user && user.email;
    }
}