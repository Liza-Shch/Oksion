export default class User {
    constructor() {
        this._email = null;
        this._permissions = null;
    }

    isAuth() {
        return this._email;
    }

    getPermissions() {
        return this._permissions;
    }

    update(user) {
        this._email = user && user.email;
        this._permissions = user && user.permissions;
    }
}