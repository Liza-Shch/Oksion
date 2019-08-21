import BaseView from "./BaseView";
import Menu from "../components/Menu/Menu";
import Store from '../scripts/store';

export default class MenuView extends BaseView {
    constructor(args) {
        super(args, Menu);
    }

    render() {
        this.page = new Menu(this.args);
        return this.page.renderDOM();
    }

    create() {
        this.setTargetRender(document.querySelector('.container'));
        console.log(Store.user);
        this.args.permissions = Store.user.getPermissions();
        console.log(this.args);
        this.el = this.render();
        this.getTargetRender().appendChild(this.el);
        console.log('Menu el', this.el);
        this.setShown(true);
    }
}