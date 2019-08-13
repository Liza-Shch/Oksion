import loginFormTmp from './LoginForm.pug';
import './LoginForm.scss';
import '../../mixins/form-input/form-input.scss';
import '../../mixins/button/button.scss';

export default class LoginForm {
    constructor() {};

    render() {
        return loginFormTmp.call({}, {});
    };
};