import BaseView from "./BaseView";
import IndexPage from "../pages/IndexPage/IndexPage";
import EventBus from '../scripts/eventbus';
import LoginForm from '../components/LoginForm/LoginForm';
import { PageEvents } from "../events/PageEvents";

export default class IndexView extends BaseView {
    constructor() {
        console.log("Index"); 
        super(IndexPage);
        this.setTargetRender(document.querySelector('.main'));
    };

    afterRender() {
        const loginButton = document.querySelector('.button_secondary');
        loginButton.addEventListener('click', (e) => {
            e.preventDefault();
            EventBus.emit(PageEvents.RENDER_LOGIN_FORM);
        });
    };

    static onLoginFormRender() {
        const targetRender = document.querySelector('.index-container__login');
        const loginForm = new LoginForm();
        targetRender.innerHTML = loginForm.render();
    }
}