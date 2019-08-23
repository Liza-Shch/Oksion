import buttonTmp from './Button.pug';
import '../../mixins/button/button.scss';

export default class Button {
    constructor(args) {
        this._type = args.type;
        this._text = args.text;
        this._el = null;
    }

    create() {
        this._el = this.renderDOM();
        return this._el;
    }

    renderDOM() {
        const data = {
            type: this._type,
            text: this._text
        }

        console.log(data);
        const html = buttonTmp.call({}, {data});
        console.log(html);
        const buffer = document.createElement('div');
        buffer.insertAdjacentHTML('afterbegin', html);
        return buffer.firstElementChild;
    }
}