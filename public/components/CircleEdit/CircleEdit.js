import './CircleEdit.scss';
import circleEditTmp from './CircleEdit.pug';
import Select from '../../components/Select/Select';
import EventBus from '../../scripts/EventBus';
import PageEvents from '../../events/PageEvents';
import APIEvents from '../../events/APIEvents';
import ButtonEdit from '../../components/ButtonEdit/ButtonEdit';

export default class CircleEdit {
    constructor({ isWork, id }) {
        this._itemID = id;
        this._currentValue = isWork ? 'work' : 'not work';
        this._el = null;
        this._options = null;
        this._select = null;
        this._buttonSave = new ButtonEdit({ action: this.save.bind(this), type: 'save', text: 'Сохранить' });
        this._buttonCancel = new ButtonEdit({ action: this.hide.bind(this), type: 'cancel', text: 'Отменить' });
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
        this._el = this.renderDOM();
        this.afterRender();
        return this._el;
    }

    hide() {
        EventBus.emit(PageEvents.CLOSE_CIRCLE_EDIT);
        document.removeEventListener('click', this._onClickOutside);
        this._el.remove();
    }

    save() {
        const data = {
            isWork: this._select.getSelectedData() === 'work' ? true : false,
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
        const select = this._select.create();

        const buttonSave = this._buttonSave.create();
        const buttonCancel = this._buttonCancel.create();
        el.querySelector('.circle-edit__controlls').append(buttonCancel, buttonSave);
        el.querySelector('.circle-edit__main').append(select);
        return el;
    }

    afterRender() {
        this._onClickOutside = this._onClickOutside.bind(this);
        setTimeout(() => document.addEventListener('click', this._onClickOutside), 100);
    }
}