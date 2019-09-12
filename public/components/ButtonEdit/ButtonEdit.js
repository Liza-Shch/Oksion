import './ButtonEdit.scss';
import buttonEditTmp from './ButtonEdit.pug';

export default class ButtonEdit {
    constructor({ action, type, text = null }) {
        this._action = action;
        this._type = type;
        this._el = null;
        this._text = text;
    }

    create() {
        this._el = this.renderDOM();
        this.afterRender()
        return this._el;
    }

    render() {
        const data = {
            type: this._type,
            text: this._text,
        }

        return buttonEditTmp.call({}, { data })
    }

    renderDOM() {
        const html = this.render();
        const buffer = document.createElement('div');
        buffer.insertAdjacentHTML('afterbegin', html)
        return buffer.firstElementChild
    }

    coverUp() {
        this._el.style['display'] = 'none';
        this._el.disabled = true;
    }

    show() {
        this._el.style['display'] = 'unset';
        this._el.disabled = false;
    }

    afterRender() {
        this._el.addEventListener('click', this._action.bind(this))
    }
}