import menuTmp from './Menu.pug';
import './Menu.scss';
import '../../mixins/link/link.scss';
import BaseComponent from '../BaseComponent';

export default class Menu extends BaseComponent {
    constructor(args) {
        super()
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
}