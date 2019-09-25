import contactsTmp from './Contacts.pug';
import './Contacts.scss';
import BaseComponent from '../BaseComponent';
import Contact from '../Contact/Contact';

export default class Contacts extends BaseComponent {
    constructor({ contacts }) {
        super();
        this._contacts = contacts;
        this._contactsObj = [];
    }

    render() {
        return contactsTmp.call({}, {})
    }

    renderDOM() {
        const html = this.render();
        const buffer = document.createElement('div');
        buffer.insertAdjacentHTML('afterbegin', html);
        const el = buffer.firstElementChild;
        
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
}