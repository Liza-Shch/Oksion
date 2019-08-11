import BaseView from "./BaseView";
import IndexPage from "../pages/IndexPage/IndexPage";
import EventBus from '../scripts/eventbus';
import LoginForm from '../components/LoginForm/LoginForm';
import PageEvents from "../events/PageEvents";
import APIEvents from "../events/APIEvents";

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
            EventBus.emit(PageEvents.AFTER_RENDER_LOGIN_FORM);
        });
    };

    static onLoginFormRender() {
        const targetRender = document.querySelector('.index-container__login');
        const loginForm = new LoginForm();
        targetRender.innerHTML = loginForm.render();
    }

    static onLoginFormAfterRender() {
        const showPasswordButton = document.querySelector('.input__password');
        showPasswordButton.addEventListener('click', (e) => {
            const input = document.querySelector('.input__input_password');
            if (input.getAttribute('type') == 'password') {
                showPasswordButton.classList.replace('input__password_show', 'input__password_hide');
                input.setAttribute('type', 'text');
            } else {
                showPasswordButton.classList.replace('input__password_hide', 'input__password_show');
                input.setAttribute('type', 'password');
            }
        });

        const loginForm = document.querySelector('.login');
        loginForm.onsubmit = (e) => {
            e.preventDefault();
            const user = {};
            user.email = loginForm.email.value;
            user.password = loginForm.password.value;

            EventBus.emit(APIEvents.LOGIN, user);
        }
    }

    static onLoginSuccess(data) {
        console.log('Login success', data);
    }

    static onLoginError(err) {
        console.log('Login error', err)
    }
}