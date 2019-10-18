import newReglamentWorkTmp from './NewReglamentWork.pug';
import './NewReglamentWork.scss';
import BaseComponent from "../BaseComponent";
import ReglamentWorkTypeSelect from '../../const/ReglamentWorkTypeSelect';
import Select from "../Select/Select";
import LabelTextarea from '../LabelTextarea/LabelTextarea';
import DateEdit from '../DateEdit/DateEdit';
import Workers from '../Workers/Workers';

export default class NewReglamentWork extends BaseComponent {
    constructor() {
        super();
        this._type = null;
        this._note = new LabelTextarea({ label: 'Произведенные работы', required: true, placeholder: 'Работы...' });
        this._date = new DateEdit({});
        this._workers = new Workers();
    }

    beforeRender() {
        const optionsWorkType = ReglamentWorkTypeSelect.map((workType) => { return Object.assign({}, workType) });
        this._type = new Select({ label: 'Тип выезда', options: optionsWorkType });
    }

    render() {
        return newReglamentWorkTmp.call({}, {})
    }

    renderDOM() {
        const el = super.renderDOM();

        const typeEl = this._type.create();
        typeEl.classList.add('new-reglament-work__margin-top');

        const noteEl = this._note.create();
        noteEl.classList.add('new-reglament-work__margin-top');

        const dateEl = this._date.create();
        dateEl.classList.add('new-reglament-work__margin-top');

        const workersEl = this._workers.create();
        workersEl.classList.add('new-reglament-work__margin-top');

        el.append(dateEl, typeEl, noteEl, workersEl);
        return el
    }

    save() {
        const workTypeData = this._type.getSelectedData();
        const noteData = this._note.save();
        const workersData = this._workers.save();
        const dateData = this._date.save();

        if (!noteData || !workersData || !dateData) {
            return null
        }

        const data = {
            workType: workTypeData,
            note: noteData.value,
            workers: workersData.value,
            date: dateData.value,
        }

        return data
    }
}