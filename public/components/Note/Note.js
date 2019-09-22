import noteTmp from './Note.pug';
import './Note.scss';
import BaseComponent from "../BaseComponent";
import EventBus from '../../scripts/EventBus';
import PageEvents from '../../events/PageEvents';

export default class Note extends BaseComponent {
    constructor({ note }) {
        super();
        this._note = note;

        EventBus.on(PageEvents.UPDATE_ITEM_NOTE, this.update.bind(this));
    }

    render() {
        const data = {
            button: 'Справка',
            note: this._note,
        }

        return noteTmp.call({}, { data })
    }

    update({ note }) {
        this._note = note;
        const newEl = this.renderDOM();
        this.el.innerHTML = newEl.innerHTML;
        this.el.classList = newEl.classList;
    }
}