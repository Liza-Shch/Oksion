import inputEditTmp from './InputEdit.pug';
import './InputEdit.scss';
import BaseComponent from "../BaseComponent";
import Input from "../Input/Input";
import ButtonEdit from "../ButtonEdit/ButtonEdit";

export default class InputEdit extends BaseComponent {
    constructor({ pattern, type, maxLength, required, placeholder }) {
        super();
        this._input = new Input({ pattern: pattern, type: type, maxLength: maxLength,
            required: required, placeholder: placeholder });
        this._buttonDelete = new ButtonEdit({ action: this.hide.bind(this), type: 'close' });
        this.save = this._input.save.bind(this._input);
    }

    render() {
        return inputEditTmp.call({}, {})
    }

    renderDOM() {
        const html = this.render();
        const buffer = document.createElement('div');
        buffer.insertAdjacentHTML('afterbegin', html);
        const el = buffer.firstElementChild;

        const inputEl = this._input.create();
        const buttonDeleteEl = this._buttonDelete.create();
        buttonDeleteEl.classList.add('input-edit__button');
        el.append(buttonDeleteEl, inputEl);

        return el
    }
}