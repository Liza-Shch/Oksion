import addressEditTmp from './AddressEdit.pug';
import './AddressEdit.scss';
import BaseComponent from '../BaseComponent';
import EditControlls from '../EditControlls/EditControlls';
import EventBus from '../../scripts/EventBus';
import PageEvents from '../../events/PageEvents';
import APIEvents from '../../events/APIEvents';
import LabelTextarea from '../LabelTextarea/LabelTextarea';

export default class AddressEdit extends BaseComponent {
    constructor({ address, id }) {
        super()
        this._currentValue = address;
        this._itemID = id;
        this._address = new LabelTextarea({ label: 'Адрес', value: this._currentValue,
            required: true, rows: 2, placeholder: 'Адрес'});
        this._controlls = new EditControlls({ actionSave: this.save.bind(this), actionCancel: this.hide.bind(this) });
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
        const el = super.renderDOM();

        const addressEl = this._address.create();
        addressEl.classList.add('address-edit__input');
        const controllsEl = this._controlls.create();
        el.append(addressEl, controllsEl);
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
        const addressData = this._address.save();
        if (!addressData) {
            return
        }

        this._currentValue = addressData.value;

        const data = {
            address: this._currentValue,
            id: this._itemID,
        }

        EventBus.emit(PageEvents.UPDATE_ITEM_ADDRESS, data);
        EventBus.emit(APIEvents.UPDATE_ITEM_ADDRESS, data);
        this.hide(e);
    }
}