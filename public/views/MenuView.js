import BaseView from "./BaseView";
import Menu from "../components/Menu/Menu";
import Store from '../scripts/Store';
import EventBus from "../scripts/EventBus";
import APIEvents from "../events/APIEvents";

export default class MenuView extends BaseView {
    constructor() {
        super(Menu);
    }

    render() {
        this.page = new Menu(this.args);
        return this.page.renderDOM();
    }

    create() {
        this.setTargetRender(document.querySelector('.container'));
        this.args.permissions = Store.user.getPermissions();
        this.el = this.render();
        this.getTargetRender().appendChild(this.el);
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