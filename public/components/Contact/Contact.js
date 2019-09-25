import contactTmp from './Contact.pug';
import './Contact.scss';
import BaseComponent from "../BaseComponent";

/**
 * name - { name, surname, patronymic }
 */
export default class Contact extends BaseComponent {
    constructor({ name, phone }) {
        super();
        this._name = name;
        this._phone = phone;
    }

    render() {
        const { name, surname, patronymic } = this._name;
        const data = {
            name: `${surname} ${name} ${patronymic}`,
            phone: this._phone,
        }

        return contactTmp.call({}, { data })
    }
} 