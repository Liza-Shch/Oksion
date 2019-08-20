import IndexContainer from '../../components/IndexContainer/IndexContainer';
import Logo from '../../components/Logo/Logo';
import './IndexPage.scss';

export default class IndexPage {
    constructor() {};

    render() {
        const main = document.createElement('div');
        main.classList.add('main');
        const logo = new Logo();
        const indexContainer = new IndexContainer();
        main.insertAdjacentHTML('beforeend', logo.render());
        main.insertAdjacentHTML('beforeend', indexContainer.render());
        return main.outerHTML;
    };
}