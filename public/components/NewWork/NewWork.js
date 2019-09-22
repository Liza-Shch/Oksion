import newWorkTmp from './NewWork.pug';
import './NewWork.scss';
import BaseComponent from '../BaseComponent';
import Select from '../Select/Select';
import WorkTypeSelect from '../../const/WorkTypeSelect';
import NewReglamentWork from '../NewReglamentWork/NewReglamentWork';
import ButtonEdit from '../ButtonEdit/ButtonEdit';
import NewNotReglamentWork from '../NewNotReglamentWork/NewNotReglamentWork';

export default class NewWork extends BaseComponent {
    constructor({ id }) {
        super();
        this._itemID = id;
        this._selectType = null;
        this._reglamentWorkForm = new NewReglamentWork();
        this._notReglamentWorkForm = new NewNotReglamentWork();
        this._workForm = null;
        this._buttonSubmit = new ButtonEdit({ type: 'save', action: this.submit.bind(this), text: 'Отправить' });
    }

    beforeRender() {
        const optionsType = WorkTypeSelect.map((workType) => { return Object.assign({}, workType )});
        this._selectType = new Select({ label: 'Тип работ', options: optionsType, onChange: this._onChangeWorkForm.bind(this)});
        const selectedType = this._selectType.getSelectedData();
        switch(selectedType) {
            case 'reglament': {
                this._workForm = this._reglamentWorkForm;
                break;
            }

            case 'notReglament': {
                this._workForm = this._notReglamentWorkForm;
                break;
            }
        }
    }

    render() {
        const data = {
            title: 'Добавление выезда'
        }

        return newWorkTmp.call({}, { data })
    }

    renderDOM() {
        const html = this.render();
        const buffer = document.createElement('div');
        buffer.insertAdjacentHTML('afterbegin', html);
        const el = buffer.firstElementChild;

        const selectTypeEl = this._selectType.create();
        selectTypeEl.classList.add('new-work__type');

        this._workFormEl = this._workForm.create();

        const buttonSubmitEl = this._buttonSubmit.create();
        buttonSubmitEl.classList.add('new-work__button');

        el.append(selectTypeEl, this._workFormEl, buttonSubmitEl);

        return el
    }

    _onChangeWorkForm() {
        const oldWorkFormEl = this._workForm.el;
        const selectedType = this._selectType.getSelectedData();
        switch(selectedType) {
            case 'reglament': {
                this._workForm = this._reglamentWorkForm;
                break;
            }

            case 'notReglament': {
                this._workForm = this._notReglamentWorkForm;
                break;
            }
        }

        const newWorkFormEl = this._workForm.create();
        this.el.replaceChild(newWorkFormEl, oldWorkFormEl);
    }

    submit(e) {
        e.preventDefault();
        const data = {
            type: this._selectType.getSelectedData(),
        }

        const workFormData = this._workForm.save();
        Object.assign(data, workFormData);

        console.log(data)
        return data
    }
}