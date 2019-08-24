import menuTmp from './Menu.pug';
import './Menu.scss';
import '../../mixins/link/link.scss';
import Store from '../../scripts/store';

export default class Menu {
    constructor(args) {
        this._permissions = args.permissions;
    };

    render() {
        const data = {
            read: this._permissions.read,
            write: this._permissions.write,
            usersModify: this._permissions.usersModify
        };

        return menuTmp.call({}, {data});
    }

    renderDOM() {
        const data = {
            read: this._permissions.read,
            write: this._permissions.write,
            usersModify: this._permissions.usersModify
        };

        const html = menuTmp.call({}, {data});
        const container = document.createElement('div');
        container.insertAdjacentHTML('afterbegin', html);
        return container.firstElementChild;
    }
}