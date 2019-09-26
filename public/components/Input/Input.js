import inputTmp from './Input.pug';
import './Input.scss';
import BaseComponent from '../BaseComponent';
import InputMsg from '../InputMsg/InputMsg';

export default class Input extends BaseComponent {
    constructor({ pattern = null, type = 'text', maxLength = '100', required = false,
        placeholder = null, value = null, msgError = 'Введите корректные данные!' }) {
        super();
        this._pattern = pattern;
        this._type = type;
        this._maxLength = maxLength;
        this._required = required;
        this._placeholder = placeholder;
        this._value = value;
        this._msgError = new InputMsg({ type: 'error', msg: msgError });
    }

    render() {
        const data = {
            pattern: this._pattern,
            type: this._type,
            maxLength: this._maxLength,
            required: this._required,
            placeholder: this._placeholder,
            value: this._value,
        }

        return inputTmp.call({}, { data })
    }

    renderError() {
        const msgErrorEl = this._msgError.create();
        msgErrorEl.classList.add('input-container__msg');
        this.el.append(msgErrorEl);
    }

    clearMsg() {
        this._msgError.el && this._msgError.hide();
    }

    save() {
        this.clearMsg();

        const inputEl = this.el.querySelector('.input-container__input');
        if (!inputEl.reportValidity()) {
            this.renderError();
            return null
        }

        return { value: inputEl.value }
    }
}