import editControllsTmp from './EditControlls.pug';
import './EditControlls.scss';
import BaseComponent from '../BaseComponent';
import ButtonEdit from '../ButtonEdit/ButtonEdit';

export default class EditControlls extends BaseComponent {
    constructor({ actionSave, actionCancel, titleSave = 'Сохранить', titleCancel = 'Отменить' }) {
        super()
        this.buttonSave = new ButtonEdit({ action: actionSave, type: 'save', text: titleSave });
        this.buttonCancel = new ButtonEdit({ action: actionCancel, type: 'cancel', text: titleCancel });
    }

    render() {
        return editControllsTmp.call({}, {})
    }

    renderDOM() {
        const html = this.render();
        const buffer = document.createElement('div');
        buffer.insertAdjacentHTML('afterbegin', html);
        const el = buffer.firstElementChild;
        
        const buttonSaveEl = this.buttonSave.create();
        const buttonCancelEl = this.buttonCancel.create();
        el.append(buttonCancelEl, buttonSaveEl);

        return el
    }
}