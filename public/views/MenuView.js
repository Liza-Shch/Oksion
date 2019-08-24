import BaseView from "./BaseView";
import Menu from "../components/Menu/Menu";
import Store from '../scripts/store';
import EventBus from "../scripts/eventbus";
import APIEvents from "../events/APIEvents";

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
        this.afterRender();
    }

    afterRender() {
        const logout = document.querySelector('.menu__button');
        logout.addEventListener('click', (e) => {
            e.preventDefault();
            EventBus.emit(APIEvents.LOGOUT);
        })
    }
}