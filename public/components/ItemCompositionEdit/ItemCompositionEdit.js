import itemCompositionEditTmp from './ItemCompositionEdit.pug';
import './ItemCompositionEdit.scss';
import BaseComponent from "../BaseComponent";
import EditControlls from "../EditControlls/EditControlls";
import ButtonEdit from "../ButtonEdit/ButtonEdit";
import ItemPartEdit from '../ItemPartEdit/ItemPartEdit';
import EventBus from '../../scripts/EventBus';
import PageEvents from '../../events/PageEvents';
import APIEvents from '../../events/APIEvents';

export default class ItemCompositionEdit extends BaseComponent {
    constructor({ id, composition }) {
        super();
        this._itemID = id;
        this._composition = composition;
        this._parts = [];
        this._controlls = new EditControlls({ actionCancel: this.hide.bind(this), actionSave: this.save.bind(this) });
        this._buttonAdd = new ButtonEdit({ action: this.addPart.bind(this), type: 'add' });
    }

    _onClickOutside(e) {
        if (!e.target.closest('.item-composition-edit') && !e.target.closest('.item-part-edit__delete')) {
            this.hide();
        }
    }

    render() {
        return itemCompositionEditTmp.call({}, {})
    }

    renderDOM() {
        const html = this.render();
        const buffer = document.createElement('div');
        buffer.insertAdjacentHTML('afterbegin', html);
        const el = buffer.firstElementChild;

        this._parts.forEach((part) => el.append(part.create()));

        const controllsContainer = document.createElement('div');
        controllsContainer.classList.add('item-composition-edit__controlls');

        const controlls = this._controlls.create();
        const buttonAdd = this._buttonAdd.create();
        controllsContainer.append(buttonAdd, controlls);

        const span = document.createElement('span');
        span.classList.add('item-composition-edit__msg');
        el.append(span, controllsContainer);
        return el;
    }

    afterRender() {
        this._onClickOutside = this._onClickOutside.bind(this);
        setTimeout(() => document.addEventListener('click', this._onClickOutside), 100);
    }

    create() {
        this._parts = this._composition.map((part) => { return new ItemPartEdit(part) });
        this.el = this.renderDOM();
        this.afterRender();
        return this.el;
    }

    hide() {
        EventBus.emit(PageEvents.CLOSE_ITEM_COMPOSITION_EDIT);
        document.removeEventListener('click', this._onClickOutside);
        this.el.remove();
    }

    save() {
        const data = [];
        if (this._parts.every((part) => !part.el)) {
            this.renderMsgError({ msg: 'Состав объекта не может быть пустым' });
            return { error: 'empty object', msg: 'Состав объекта не может быть пустым' }
        }

        for (let i = 0; i < this._parts.length; i++) {
            if (this._parts[i].el) {
                const savedPart = this._parts[i].save();
                if (savedPart.error) {
                    this.renderMsgError({ msg: savedPart.msg });
                    return savedPart
                }
                data.push(savedPart);
            }
        }
        this.hide();
        this._composition = data;
        EventBus.emit(PageEvents.UPDATE_ITEM_COMPOSITION, this._composition);
        EventBus.emit(APIEvents.UPDATE_ITEM_COMPOSITION, { composition: this._composition, id: this._itemID });
    }

    addPart() {
        const newPart = new ItemPartEdit({ name: '', count: 1 });
        this._parts.push(newPart);
        const newPartEl = newPart.create();
        const elAfter = this.el.querySelector('.item-composition-edit__msg');
        this.el.insertBefore(newPartEl, elAfter);
    }

    renderMsgError({ msg }) {
        const span = document.querySelector('.item-composition-edit__msg');
        span.classList.add('item-composition-edit__msg_error');
        span.innerText = msg;
    }
}