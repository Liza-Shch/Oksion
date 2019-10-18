import noteEditTmp from './NoteEdit.pug';
import './NoteEdit.scss';
import BaseComponent from '../BaseComponent';
import EventBus from '../../scripts/EventBus';
import PageEvents from '../../events/PageEvents';
import APIEvents from '../../events/APIEvents';
import EditControlls from '../EditControlls/EditControlls';

export default class NoteEdit extends BaseComponent {
    constructor({ note, id }) {
        super();
        this._currentValue = note;
        this._itemID = id;
        this._controlls = new EditControlls({ actionSave: this.save.bind(this), actionCancel: this.hide.bind(this) });
    }

    _onClickOutside(e) {
        if (!e.target.closest('.note-edit')) {
            this.hide(e);
        }
    }

    render() {
        const data = {
            note: this._currentValue,
        }

        return noteEditTmp.call({}, { data })
    }

    renderDOM() {
        const el = super.renderDOM();

        const controllsEl = this._controlls.create();
        el.append(controllsEl);

        return el
    }

    hide(e) {
        e.stopPropagation();
        EventBus.emit(PageEvents.CLOSE_NOTE_EDIT);
        document.removeEventListener('click', this._onClickOutside);
        this.el.remove();
        this.el = null;
    }

    afterRender() {
        this._onClickOutside = this._onClickOutside.bind(this);
        setTimeout(() => document.addEventListener('click', this._onClickOutside), 100);
    }

    save(e) {
        const inputEl = this.el.querySelector('.note-edit__input');
        this._currentValue = inputEl.value;

        const data = {
            note: this._currentValue,
            id: this._itemID,
        }

        EventBus.emit(PageEvents.UPDATE_ITEM_NOTE, data);
        EventBus.emit(APIEvents.UPDATE_ITEM_NOTE, data);

        this.hide(e);
    }
}