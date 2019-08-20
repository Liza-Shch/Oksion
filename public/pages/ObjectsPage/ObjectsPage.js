import './ObjectsPage.scss';

export default class ObjectsPage {
    constructor(args) {
        this._el = args.el;
        console.log("ObjectsPage");
    };

    render() {
        this._el.classList.add('main-objects');
        return this._el;
    }
}