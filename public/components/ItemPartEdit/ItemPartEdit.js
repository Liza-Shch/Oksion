import itemPartEditTmp from './ItemPartEdit.pug';
import './ItemPartEdit.scss';
import BaseComponent from "../BaseComponent";
import ButtonEdit from '../ButtonEdit/ButtonEdit';
import RegularValue from '../RegularValue/RegularValue';

export default class ItemPartEdit extends BaseComponent {
    constructor({ name, count }) {
        super();
        this._name = name;
        this._count = count;
        this._regularCount = new RegularValue({ currentValue: this._count });
        this._buttonDelete = new ButtonEdit({ action: this.hide.bind(this), type: 'close' });
    }

    render() {
        const data = {
            name: this._name,
            count: this._count,
        }

        return itemPartEditTmp.call({}, { data });
    }

    renderDOM() {
        const el = super.renderDOM();

        const regularCount = this._regularCount.create();
        const buttonDelete = this._buttonDelete.create();
        buttonDelete.classList.add('item-part-edit__delete');
        el.append(buttonDelete, regularCount);
        return el;
    }

    save() {
        this._name = this.el.querySelector('.item-part-edit__name').value;
        this._count = this.el.querySelector('.regular-value__value-js').textContent;
        if (!this._name) {
           return { error: 'empty part', msg: 'Заполните все поля' };
        }

        return {
            name: this._name,
            count: +this._count,
        }
    }

    hide(e) {
        e.stopPropagation();
        this.el.remove();
        this.el = null;
    }
}