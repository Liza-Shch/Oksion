import contactsTmp from './Contacts.pug';
import './Contacts.scss';
import BaseComponent from '../BaseComponent';
import Contact from '../Contact/Contact';
import EventBus from '../../scripts/EventBus';
import PageEvents from '../../events/PageEvents';

export default class Contacts extends BaseComponent {
    constructor({ contacts }) {
        super();
        this._contacts = contacts;
        this._contactsObj = [];
        EventBus.on(PageEvents.UPDATE_ITEM_CONTACTS, this.update.bind(this));
    }

    render() {
        return contactsTmp.call({}, {})
    }

    renderDOM() {
        const el = super.renderDOM();
        
        this._contacts.forEach((contact) => {
            const contactObj = new Contact(contact);
            const contactEl = contactObj.create();
            contactEl.classList.add('contacts__contact');
            this._contactsObj.push(contactObj);
            el.append(contactEl);
        });

        this._contactsObj[0].el.classList.remove('contacts__contact');

        return el
    }

    update({ contacts }) {
        this._contacts = contacts;
        
    }
}