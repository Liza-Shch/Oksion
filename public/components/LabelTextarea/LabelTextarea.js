import labelTextareaTmp from './LabelTextarea.pug';
import './LabelTextarea.scss'
import BaseComponent from "../BaseComponent";
import Textarea from "../Textarea/Textarea";

export default class LabelTextarea extends BaseComponent {
    constructor({ label, required, rows, placeholder, value }) {
        super();
        this._label = label;
        this._textarea = new Textarea({ required: required, rows: rows, placeholder: placeholder, value: value });
        this.save = this._textarea.save.bind(this._textarea);
    }

    render() {
        const data = {
            label: this._label,
        }

        return labelTextareaTmp.call({}, { data })
    }

    renderDOM() {
        const html = this.render();
        const buffer = document.createElement('div');
        buffer.insertAdjacentHTML('afterbegin', html);
        const el = buffer.firstElementChild;

        const textareaEl = this._textarea.create();
        el.append(textareaEl)

        return el
    }
}