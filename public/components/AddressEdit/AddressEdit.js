import addressEditTmp from './AddressEdit.pug';
import './AddressEdit.scss';
import BaseComponent from '../BaseComponent';
import EditControlls from '../EditControlls/EditControlls';
import EventBus from '../../scripts/EventBus';
import PageEvents from '../../events/PageEvents';
import APIEvents from '../../events/APIEvents';

export default class AddressEdit extends BaseComponent {
    constructor({ address, id }) {
        super()
        this._currentValue = address;
        this._itemID = id;
        this._controlls = new EditControlls({ actionSave: this.save.bind(this), actionCancel: this.hide.bind(this) })
    }

    _onClickOutside(e) {
        if (!e.target.closest('.address-edit')) {
            this.hide(e);
        }
    }

    render() {
        const data = {
            text: this._currentValue,
        }

        return addressEditTmp.call({}, { data })
    }

    renderDOM() {
        const html = this.render();
        const buffer = document.createElement('div');
        buffer.insertAdjacentHTML('afterbegin', html);
        const el = buffer.firstElementChild;

        const controllsEl = this._controlls.create();
        el.append(controllsEl)

        return el
    }

    afterRender() {
        this._onClickOutside = this._onClickOutside.bind(this);
        setTimeout(() => document.addEventListener('click', this._onClickOutside), 100);
    }

    hide(e) {
        e.stopPropagation();
        EventBus.emit(PageEvents.CLOSE_ADDRESS_EDIT);
        document.removeEventListener('click', this._onClickOutside);
        this.el.remove();
    }

    save(e) {
        this._currentValue = this.el.querySelector('.address-edit__input').value;

        const data = {
            address: this._currentValue,
            id: this._itemID,
        }

        EventBus.emit(PageEvents.UPDATE_ITEM_ADDRESS, data);
        EventBus.emit(APIEvents.UPDATE_ITEM_ADDRESS, data);
        this.hide(e);
    }
}