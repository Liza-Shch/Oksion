import BaseView from "./BaseView";
import IndexPage from "../pages/IndexPage/IndexPage";
import EventBus from '../scripts/EventBus';
import LoginForm from '../components/LoginForm/LoginForm';
import PageEvents from "../events/PageEvents";
import APIEvents from "../events/APIEvents";
import ERROR from "../network/Errors";
import ERROR_MSG from "../pages/ErrorMsg";
import FormMixin from "./mixins/FormMixin";

export default class IndexView extends BaseView {
    constructor() {
        console.log("Index"); 
        super(IndexPage);
        this.setTargetRender(document.querySelector('.container'));
        this.formController = FormMixin;

        EventBus.on(PageEvents.RENDER_LOGIN_FORM, this.onLoginFormRender.bind(this));
        EventBus.on(PageEvents.AFTER_RENDER_LOGIN_FORM, this.onLoginFormAfterRender.bind(this));
        EventBus.on(PageEvents.LOGIN_SUCCESS, this.onLoginSuccess.bind(this));
        EventBus.on(PageEvents.LOGIN_ERROR, this.onLoginError.bind(this));
    };

    afterRender() {
        const loginButton = document.querySelector('.button_secondary');
        loginButton.addEventListener('click', (e) => {
            e.preventDefault();
            EventBus.emit(PageEvents.RENDER_LOGIN_FORM);
            EventBus.emit(PageEvents.AFTER_RENDER_LOGIN_FORM);
        });
    };

    onLoginFormRender() {
        const targetRender = document.querySelector('.index-container__login');
        const loginForm = new LoginForm();
        targetRender.innerHTML = loginForm.render();
    }

    onLoginFormAfterRender() {
        const showPasswordButton = document.querySelector('.form-input__password');
        showPasswordButton.addEventListener('click', (e) => {
            const input = document.querySelector('.form-input__input_password');
            if (input.getAttribute('type') == 'password') {
                showPasswordButton.classList.replace('form-input__password_show', 'form-input__password_hide');
                input.setAttribute('type', 'text');
            } else {
                showPasswordButton.classList.replace('form-input__password_hide', 'form-input__password_show');
                input.setAttribute('type', 'password');
            }
        });

        const loginForm = document.querySelector('.login');
        loginForm.onsubmit = (e) => {
            e.preventDefault();
            this.formController.clearErrors();
            const result = this.formController.validation(loginForm);
            if (!result.success) {
                return this.formController.renderInputErrors(result.emptyInputs);
            }

            const user = {};
            user.email = loginForm.email.value;
            user.password = loginForm.password.value;

            EventBus.emit(APIEvents.LOGIN, user);
        }
    }

    onLoginSuccess() {
        EventBus.emit(PageEvents.CREATE_ITEMS_PAGE, '/items');
    }

    onLoginError(errors) {
        console.log('Login error', errors);
        errors.forEach((err) => {
            switch(err) {
                case ERROR.USER_NOT_FOUND: {
                    console.log('user not found');
                    const email = document.querySelector('input[type=email]');
                    const error = email.parentElement.nextElementSibling;
                    const data = [
                        {
                            input: email,
                            error: error,
                            msg: ERROR_MSG.USER_NOT_FOUND
                        }
                    ];

                    this.formController.renderInputErrors(data);
                    break;
                }
                case ERROR.PASSWORD_NOT_MATCHED: {
                    const password = document.querySelector('input[type=password]');
                    const error = password.parentElement.nextElementSibling;
                    const data = [{
                        input: password,
                        error: error,
                        msg: ERROR_MSG.PASSWORD_NOT_MATCHED
                    }];

                    this.formController.renderInputErrors(data);
                    break;
                }
                default:
                    EventBus.emit(PageEvents.RENDER_SERVER_ERROR);
            }
        })
    }
}