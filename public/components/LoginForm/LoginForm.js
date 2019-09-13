import loginFormTmp from './LoginForm.pug';
import './LoginForm.scss';
import '../../mixins/form-input/form-input.scss';
import '../../mixins/button/button.scss';
import BaseComponent from '../BaseComponent';

export default class LoginForm extends BaseComponent {
    constructor() {
        super()
    };

    render() {
        return loginFormTmp.call({}, {});
    };
};