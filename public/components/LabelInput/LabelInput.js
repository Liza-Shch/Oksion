import labelInputTmp from './LabelInput.pug';
import './LabelInput.scss'
import BaseComponent from "../BaseComponent";
import Input from '../Input/Input';

export default class LabelTextarea extends BaseComponent {
    constructor({ label, required, pattern, type, maxLength, placeholder,  value, msgError }) {
        super();
        this._label = label;
        this._input = new Input({ required: required, pattern: pattern, type: type,
            maxLength: maxLength, placeholder: placeholder, value: value, msgError: msgError });
        this.save = this._input.save.bind(this._input);
        this.hide = this._input.hide.bind(this._input);
    }

    render() {
        const data = {
            label: this._label,
        }

        return labelInputTmp.call({}, { data })
    }

    renderDOM() {
        const html = this.render();
        const buffer = document.createElement('div');
        buffer.insertAdjacentHTML('afterbegin', html);
        const el = buffer.firstElementChild;

        const inputEl = this._input.create();
        el.append(inputEl)

        return el
    }
}