import './ButtonEdit.scss';
import buttonEditTmp from './ButtonEdit.pug';
import BaseComponent from '../BaseComponent';

export default class ButtonEdit extends BaseComponent {
    constructor({ action, type, text = null }) {
        super()
        this._action = action;
        this._type = type;
        this._text = text;
    }

    render() {
        const data = {
            type: this._type,
            text: this._text,
        }

        return buttonEditTmp.call({}, { data })
    }

    coverUp() {
        this.el.style['display'] = 'none';
        this.el.disabled = true;
    }

    show() {
        this.el.style['display'] = 'unset';
        this.el.disabled = false;
    }

    afterRender() {
        this.el.addEventListener('click', this._action.bind(this))
    }
}