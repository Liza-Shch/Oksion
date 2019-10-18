import contactsEditTmp from './ContactsEdit.pug';
import './ContactsEdit.scss';
import BaseComponent from "../BaseComponent";
import ContactsEditPart from '../ContactsEditPart/ContactsEditPart';
import EditControlls from '../EditControlls/EditControlls';
import ButtonEdit from '../ButtonEdit/ButtonEdit';
import EventBus from '../../scripts/EventBus';
import PageEvents from '../../events/PageEvents';
import InputMsg from '../InputMsg/InputMsg';

export default class ContactsEdit extends BaseComponent {
    constructor({ contacts }) {
        super();
        this._contacts = contacts;
        this._parts = [];
        this._controlls = new EditControlls({ actionSave: this.save.bind(this), actionCancel: this.hide.bind(this) });
        this._buttonAdd = new ButtonEdit({ action: this.addPart.bind(this), type: 'inc' });
        this._msgError = new InputMsg({ type: 'error', msg: 'Добавьте хотя бы один контакт' });
    }

    _onClickOutside(e) {
        if (!e.target.closest('.contacts-edit')) {
            this.hide(e);
        }
    }

    beforeRender() {
        this._parts = [];
    }

    render() {
        return contactsEditTmp.call({}, {});
    }

    renderDOM() {
        const el = super.renderDOM();

        this._contacts.forEach((contact) => {
            const part = new ContactsEditPart(contact);
            this._parts.push(part);
            const partEl = part.create();
            partEl.classList.add('contacts-edit__part');
            el.append(partEl);
        });
        
        this._parts[0].el.classList.remove('contacts-edit__part');

        const controllsContainer = document.createElement('div');
        controllsContainer.classList.add('contacts-edit__controlls');

        const controlls = this._controlls.create();
        const buttonAdd = this._buttonAdd.create();
        buttonAdd.classList.add('contacts-edit__button-add');
        controllsContainer.append(buttonAdd, controlls);

        const span = document.createElement('span');
        span.classList.add('contacts-edit__msg');
        el.append(span, controllsContainer);
        return el;
    }

    renderError() {
        const msgErrorEl = this._msgError.create();
        this.el.prepend(msgErrorEl);
    }

    clearError() {
        this._msgError.el && this._msgError.hide();
    }

    afterRender() {
        this._onClickOutside = this._onClickOutside.bind(this);
        setTimeout(() => document.addEventListener('click', this._onClickOutside), 100);
    }

    hide(e) {
        e.stopPropagation();
        EventBus.emit(PageEvents.CLOSE_CONTACTS_EDIT);
        document.removeEventListener('click', this._onClickOutside);
        this.el.remove();
    }

    save(e) {
        this.clearError();
        const data = [];
        let error = false;

        for (let i = 0; i < this._parts.length; i++) {
            const part = this._parts[i];
            if (part.el) {
                const partData = part.save();
                if (partData) {
                    data.push(partData);
                } else {
                    error = true;
                }
            }
        }
        
        if (error) {
            return null
        }

        if (!data.length) {
            this.renderError();
            return null;
        }

        this.hide(e);
        console.log(data);
        const value = {
            contacts: data,
        }

        EventBus.emit(PageEvents.UPDATE_ITEM_CONTACTS, value);
        return data;
    }

    addPart() {
        this._msgError.el && this._msgError.hide();

        const part = new ContactsEditPart({});
        this._parts.push(part);
        const partEl = part.create();
        partEl.classList.add('contacts-edit__part');
        const beforeAppendEl = this.el.querySelector('.contacts-edit__controlls');
        this.el.insertBefore(partEl, beforeAppendEl);
    }
}