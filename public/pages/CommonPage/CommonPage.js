import './CommonPage.scss';
import Menu from '../../components/Menu/Menu';

export default class CommonPage {
    constructor(authAs) {
        this._authAs = authAs;
    };

    render() {
        console.log("CommonPage render");
        console.log(this._authAs);
        const commonPage = document.createElement('div');
        commonPage.classList.add('container');

        if (this._authAs) {
            const menu = new Menu();
            commonPage.insertAdjacentHTML('afterbegin', menu.render());
        }

        return commonPage.outerHTML;
    };
};