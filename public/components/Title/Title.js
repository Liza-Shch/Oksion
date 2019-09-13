import textTmp from './Title.pug';
import './Title.scss';
import BaseComponent from '../BaseComponent';

export default class Title extends BaseComponent {
    constructor(args) {
        super()
        this._text = args.text;
    }

    render() {
        const data = {
            text: this._text,
        }

        return textTmp.call({}, {data});
    }
}