import loginFormTmp from './LoginForm.pug';
import './LoginForm.scss';

export default class LoginForm {
    constructor() {};

    render() {
        return loginFormTmp.call({}, {});
    };
};