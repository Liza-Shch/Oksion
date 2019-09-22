import buttonTmp from './Button.pug';
import '../../mixins/button/button.scss';
import BaseComponent from '../BaseComponent';

export default class Button extends BaseComponent {
    constructor(args) {
        super()
        this._type = args.type;
        this._text = args.text;
    }

    render() {
        const data = {
            type: this._type,
            text: this._text
        }

        return buttonTmp.call({}, { data });
    }
}