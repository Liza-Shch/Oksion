import './CommonPage.scss';
import Logo from "../../components/Logo/Logo";

export default class CommonPage {
    constructor(authAs) {
        this._authAs = authAs;
    };

    render() {
        console.log("CommonPage render");
        let html = '';

        const logo = new Logo();
        html += logo.render();

        const commonPage = document.createElement('div');
        commonPage.classList.add('container');
        commonPage.insertAdjacentHTML("afterbegin", html);

        const main = document.createElement('div');
        main.classList.add('main');
        commonPage.appendChild(main);

        return commonPage.outerHTML;
    };
};