import BaseView from "./BaseView";
import LoginPage from '../pages/LoginPage/LoginPage';

export default class LoginView extends BaseView {
    constructor() {
        console.log("LoginView");
        super(LoginPage);
        this.setTargetRender(document.querySelector('.main'));
    };

    beforeRender() {};

    afterRender() {};
}