import Store from '../scripts/store';

export default class User {
    constructor() {
        this._email = null;
        this._permissions = null;
    }

    isAuth() {
        return this._email;
    }

    _collectPermissions(permissions) {
        const _permissions = {
            read: null,
            write: null,
            usersModify: null
        };

        if (!permissions) {
            return null;
        };

        permissions.forEach((permission) => {
            switch (permission.name) {
                case Store.permissions.read.name:
                    _permissions.read = Store.permissions.read;
                    break;
                case Store.permissions.write.name:
                    _permissions.write = Store.permissions.write;
                    break;
                case Store.permissions.usersModify.name:
                    _permissions.usersModify = Store.permissions.usersModify;
                    break;
            }
        });
        return _permissions;
    }

    getPermissions() {
        return this._permissions;
    }

    update(user) {
        this._email = user && user.email;
        this._permissions = user && this._collectPermissions(user.permissions);
    }
}