import IndexContainer from '../../components/IndexContainer/IndexContainer';
import Logo from '../../components/Logo/Logo';
import './IndexPage.scss';

export default class IndexPage {
    constructor({ el }) {
        this.el = el;
    };

    render() {
        this.el.classList.add('main');
        const logo = new Logo();
        const logoEl = logo.create();

        const indexContainer = new IndexContainer();
        const indexContainerEl = indexContainer.create();

        this.el.append(logoEl, indexContainerEl);
        return this.el;
    };
}