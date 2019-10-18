import itemTypeEditTmp from './ItemTypeEdit.pug';
import './ItemTypeEdit.scss'; 
import BaseComponent from "../BaseComponent";
import Select from '../Select/Select';
import EditControlls from "../EditControlls/EditControlls";
import ItemTypesSelect from "../../const/ItemTypesSelect";
import EventBus from '../../scripts/EventBus';
import PageEvents from '../../events/PageEvents';
import APIEvents from '../../events/APIEvents';

export default class ItemTypeEdit extends BaseComponent {
    constructor({ id, type }) {
        super()
        this._itemID = id;
        this._currentValue = type;
        this._options = null;
        this._select = null;
        this._controlls = new EditControlls({ actionSave: this.save.bind(this), actionCancel: this.hide.bind(this) });
    }

    _onClickOutside(e) {
        if (!e.target.closest('.item-type-edit')) {
            this.hide(e);
        }
    }

    prepareArgs() {
        this._options = ItemTypesSelect.map((type) => { return Object.assign({}, type)}).filter((type) => type.value !== 'any');
        this._options[this._options.findIndex((item) => item.value === this._currentValue.value)].chosen = true;
    }

    create() {
        this.prepareArgs();
        this._select = new Select({ label: 'Тип объекта', options: this._options });
        this.el = this.renderDOM();
        this.afterRender()
        return this.el
    }

    render() {
        return itemTypeEditTmp.call({}, {})
    }

    renderDOM() {
        const el = super.renderDOM();

        const selectEl = this._select.create();
        const controllsEl = this._controlls.create();
        el.append(selectEl, controllsEl)
        return el;
    }

    afterRender() {
        this._onClickOutside = this._onClickOutside.bind(this);
        setTimeout(() => document.addEventListener('click', this._onClickOutside), 100);
    }

    hide(e) {
        e.stopPropagation();
        EventBus.emit(PageEvents.CLOSE_ITEM_TYPE_EDIT);
        document.removeEventListener('click', this._onClickOutside);
        this.el.remove();
    }

    save(e) {
        const selectedType = this._select.getSelectedData();
        this._currentValue = ItemTypesSelect.find((type) => type.value === selectedType);
        const data = {
            type: this._currentValue,
            id: this._itemID,
        }

        EventBus.emit(PageEvents.UPDATE_ITEM_TYPE, data);
        EventBus.emit(APIEvents.UPDATE_ITEM_TYPE, { type: this._currentValue.value, id: this._itemID });
        this.hide(e);
    }
}