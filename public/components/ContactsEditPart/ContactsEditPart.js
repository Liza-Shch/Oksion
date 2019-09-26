import contactsEditPartTmp from './ContactsEditPart.pug';
import './ContactsEditPart.scss';
import BaseComponent from "../BaseComponent";
import LabelInput from "../LabelInput/LabelInput";
import PhoneEdit from '../PhoneEdit/PhoneEdit';
import ButtonEdit from '../ButtonEdit/ButtonEdit';

export default class ContactsEditPart extends BaseComponent {
    constructor({ name, phone, position }) {
        super();
        this._name = name;
        this._phone = phone;
        this._position = position;
        this._surnameObj = new LabelInput({ label: 'Фамилия', required: true, placeholder: 'Фамилия', value: this._name && this._name.surname });
        this._nameObj = new LabelInput({ label: 'Имя', required: true, placeholder: 'Имя', value: this._name && this._name.name });
        this._patronymicObj = new LabelInput({ label: 'Отчество', required: true, placeholder: 'Отчество', value: this._name && this._name.patronymic });
        this._positionObj = new LabelInput({ label: 'Должность', required: true, placeholder: 'Должность', value: this._position });
        this._phoneObj = new PhoneEdit({ phone: phone });
        this._buttonClose = new ButtonEdit({ action: this.hide.bind(this), type: 'close' });
    }

    render() {
        return contactsEditPartTmp.call({}, {})
    }

    renderDOM() {
        const html = this.render();
        const buffer = document.createElement('div');
        buffer.insertAdjacentHTML('afterbegin', html);
        const el = buffer.firstElementChild;

        const surnameEl = this._surnameObj.create();
        const nameEl = this._nameObj.create();
        const patronymicEl = this._patronymicObj.create();
        const positionEl = this._positionObj.create();
        const phoneEl = this._phoneObj.create();
        const buttonCloseEl = this._buttonClose.create();
        buttonCloseEl.classList.add('contacts-edit-part__button');
        el.append(surnameEl, nameEl, patronymicEl, positionEl, phoneEl, buttonCloseEl);
        return el
    }

    save() {
        const surnameData = this._surnameObj.save();
        const nameData = this._nameObj.save();
        const patronymicData = this._patronymicObj.save();
        const positionData = this._positionObj.save();
        const phoneData = this._phoneObj.save();

        if (!surnameData || !nameData || !patronymicData || !nameData || !phoneData || !positionData) {
            return null;
        }

        return {
            value : {
                name: nameData,
                position: positionData,
                phone: phoneData,
            }
        }
    }

    hide(e) {
        e.stopPropagation();
        this.el.remove();
        this.el = null;
    }
}