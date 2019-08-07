import LoginForm from '../../components/LoginForm/LoginForm';

export default class LoginPage {
    constructor() {};

    render() {
        let html = '';
        
        const loginForm = new LoginForm();
        html += loginForm.render();

        return html;
    };
}