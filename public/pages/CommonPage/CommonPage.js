import './CommonPage.scss';
import Menu from '../../components/Menu/Menu';

export default class CommonPage {
    constructor({ el, permissions }) {
        this.el = el;
        this._permissions = permissions;
    };

    render() {
        this.el.classList.add('container');

        if (this._permissions) {
            const menu = new Menu({permissions: this._permissions});
            const menuEl = menu.create();
            this.el.append(menuEl);
        }

        return this.el;
    };
};