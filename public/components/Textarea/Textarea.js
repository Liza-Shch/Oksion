import textareaTmp from './Textarea.pug';
import './Textarea.scss';
import BaseComponent from "../BaseComponent";
import InputMsg from '../InputMsg/InputMsg';

export default class Textarea extends BaseComponent {
    constructor({ required = false, rows = 10, placeholder = null, value }) {
        super();
        this._required = required;
        this._rows = rows;
        this._placeholder = placeholder;
        this._value = value;
        this._msg = new InputMsg({ type: 'error', msg: 'Заполните обязательное поле!' });
    }

    render() {
        const data = {
            required: this._required,
            rows: this._rows,
            placeholder: this._placeholder,
            value: this._value,
        }

        return textareaTmp.call({}, { data })
    }

    clearMsg() {
        this._msg.el && this._msg.hide()
    }

    save() {
        this.clearMsg();

        const textareaEl = this.el.querySelector('.textarea-container__textarea');
        if (!textareaEl.reportValidity()) {
            const msgEl = this._msg.create();
            msgEl.classList.add('textarea-container__msg');
            this.el.append(msgEl);
            return null
        }

        this._value = textareaEl.value;
        
        return { value: this._value }
    }
}