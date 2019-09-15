import './CircleEdit.scss';
import circleEditTmp from './CircleEdit.pug';
import Select from '../../components/Select/Select';
import EventBus from '../../scripts/EventBus';
import PageEvents from '../../events/PageEvents';
import APIEvents from '../../events/APIEvents';
import ButtonEdit from '../../components/ButtonEdit/ButtonEdit';
import BaseComponent from '../BaseComponent';
import EditControlls from '../EditControlls/EditControlls';

export default class CircleEdit extends BaseComponent {
    constructor({ isWork, id }) {
        super();
        this._itemID = id;
        this._currentValue = isWork ? 'work' : 'not work';
        this._options = null;
        this._select = null;
        this._controlls = new EditControlls({ actionSave: this.save.bind(this), actionCancel: this.hide.bind(this) })
    }

    prepareArgs() {
        this._options = [
            { text: 'P', value: 'work', chosen: false },
            { text: 'Н', value: 'not work', chosen: false }
        ]

        this._options[this._options.findIndex((item) => item.value === this._currentValue)].chosen = true;
    }

    _onClickOutside(e) {
        if (!e.target.closest('.circle-edit')) {
            this.hide();
        }
    }

    create() {
        this.prepareArgs();
        this._select = new Select({ options: this._options, label: 'Работоспособность' });
        this.el = this.renderDOM();
        this.afterRender();
        return this.el;
    }

    hide() {
        EventBus.emit(PageEvents.CLOSE_CIRCLE_EDIT);
        document.removeEventListener('click', this._onClickOutside);
        this.el.remove();
    }

    save() {
        this._currentValue = this._select.getSelectedData();
        const data = {
            isWork: this._currentValue === 'work' ? true: false,
            id: this._itemID,
        }

        EventBus.emit(PageEvents.UPDATE_ITEM_WORK, data);
        EventBus.emit(APIEvents.UPDATE_ITEM_WORK, data);
        this.hide();
    }

    render() {
        return circleEditTmp.call({}, {})
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

    afterRender() {
        this._onClickOutside = this._onClickOutside.bind(this);
        setTimeout(() => document.addEventListener('click', this._onClickOutside), 100);
    }
}