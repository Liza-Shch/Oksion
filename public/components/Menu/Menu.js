import menuTmp from './Menu.pug';
import './Menu.scss';

export default class Menu {
    constructor() {};

    render() {
        return menuTmp.call({}, {});
    }
}