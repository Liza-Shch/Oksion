import IndexContainer from '../../components/IndexContainer/IndexContainer';
import Logo from '../../components/Logo/Logo';
import './IndexPage.scss';

export default class IndexPage {
    constructor(args) {
        this._el = args.el;
    };

    render() {
        this._el.classList.add('main');
        const logo = new Logo();
        const indexContainer = new IndexContainer();
        this._el.insertAdjacentHTML('beforeend', logo.render());
        this._el.insertAdjacentHTML('beforeend', indexContainer.render());
        return this._el;
    };
}