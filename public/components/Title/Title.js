import textTmp from './Title.pug';
import './Title.scss';

export default class Title {
    constructor(args) {
        this._text = args.text;
    }

    renderDOM() {
        const data = {
            text: this._text,
        }

        const html = textTmp.call({}, {data});
        const buffer = document.createElement('div');
        buffer.insertAdjacentHTML('afterbegin', html);
        return buffer.firstElementChild;
    }
}