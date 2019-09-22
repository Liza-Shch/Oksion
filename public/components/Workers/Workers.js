import workersTmp from './Workers.pug';
import './Workers.scss';
import BaseComponent from "../BaseComponent";
import ButtonEdit from '../ButtonEdit/ButtonEdit';
import Input from '../Input/Input';
import InputEdit from '../InputEdit/InputEdit';

export default class Workers extends BaseComponent {
    constructor() {
        super();
        this._buttonAdd = new ButtonEdit({ action: this.addWorker.bind(this), type: 'inc' });
        this._workers = [];
    }

    render() {
        const data = {
            label: 'Исполнители',
        }

        return workersTmp.call({}, { data })
    }

    renderDOM() {
        const html = this.render();
        const buffer = document.createElement('div');
        buffer.insertAdjacentHTML('afterbegin', html);
        const el = buffer.firstElementChild;

        const input = new Input({ required: true, placeholder: 'Исполнитель...' });
        this._workers.push(input);
        const inputEl = input.create();
        inputEl.classList.add('workers__input');

        const buttonAddEl = this._buttonAdd.create();
        buttonAddEl.classList.add('workers__button');
        el.append(inputEl, buttonAddEl);

        return el
    }

    addWorker() {
        const input = new InputEdit({ required: true, placeholder: 'Исполнитель...' });
        this._workers.push(input);
        const inputEl = input.create();
        inputEl.classList.add('workers__input');
        this.el.insertBefore(inputEl, this._buttonAdd.el);
    }


    save() {
        const data = [];

        this._workers.forEach((worker) => {
            const workerData = worker.el && worker.save();
            if (workerData) {
                data.push(workerData.value)
            }
        })

        if (!data.length) {
            return null
        }

        return { value: data }
    }
}