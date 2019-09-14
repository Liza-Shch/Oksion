import districtItemEditTmp from './DistrictItemEdit.pug';
import './DistrictItemEdit.scss';
import BaseComponent from '../BaseComponent';
import Select from '../Select/Select';
import EditControlls from '../EditControlls/EditControlls';
import EventBus from '../../scripts/EventBus';
import PageEvents from '../../events/PageEvents';
import APIEvents from '../../events/APIEvents';
import DistrictSelect from '../../const/DistrictSelect';

export default class DistrictItemEdit extends BaseComponent {
    constructor({ id, district }) {
        super();
        this._itemID = id;
        this._currentValue = district;
        this._options = null;
        this._select = null;
        this._controlls = new EditControlls({ actionSave: this.save.bind(this), actionCancel: this.hide.bind(this) });
    }

    _onClickOutside(e) {
        if (!e.target.closest('.district-item-edit')) {
            this.hide();
        }
    }

    prepareArgs() {
        this._options = DistrictSelect.map((district) => { return Object.assign({}, district)}).filter((district) => district.value !== 'any');
        this._options[this._options.findIndex((district) => district.value === this._currentValue.value)].chosen = true;
    }

    render() {
        return districtItemEditTmp.call({}, {})
    }

    renderDOM() {
        const html = this.render();
        const buffer = document.createElement('div');
        buffer.insertAdjacentHTML('afterbegin', html);
        const el = buffer.firstElementChild;

        const selectEl = this._select.create();
        const controllsEl = this._controlls.create();
        el.append(selectEl, controllsEl)
        return el;
    }

    create() {
        this.prepareArgs();
        this._select = new Select({ label: 'Округ', options: this._options });
        this.el = this.renderDOM();
        this.afterRender()
        return this.el
    }

    afterRender() {
        this._onClickOutside = this._onClickOutside.bind(this);
        setTimeout(() => document.addEventListener('click', this._onClickOutside), 100);
    }

    hide() {
        EventBus.emit(PageEvents.CLOSE_ITEM_DISTRICT_EDIT);
        document.removeEventListener('click', this._onClickOutside);
        this.el.remove();
    }

    save() {
        const selectedType = this._select.getSelectedData();
        this._currentValue = DistrictSelect.find((district) => district.value === selectedType);
        const data = {
            district: this._currentValue,
            id: this._itemID,
        }

        EventBus.emit(PageEvents.UPDATE_ITEM_DISTRICT, data);
        EventBus.emit(APIEvents.UPDATE_ITEM_DISTRICT, { district: this._currentValue.value, id: this._itemID });
        this.hide();
    }
}