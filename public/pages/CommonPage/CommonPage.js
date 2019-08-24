import './CommonPage.scss';
import Menu from '../../components/Menu/Menu';

export default class CommonPage {
    constructor(args) {
        this._el = args.el;
        this._permissions = args.permissions;
        console.log('CommonPAge constr', args);
    };

    render() {
        this._el.classList.add('container');

        if (this._permissions) {
            const menu = new Menu({permissions: this._permissions});
            this._el.insertAdjacentHTML('afterbegin', menu.render());
        }

        return this._el;
    };
};