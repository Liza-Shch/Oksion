import newNotReglamentWorkTmp from './NewNotReglamentWork.pug';
import './NewNotReglamentWork.scss';
import BaseComponent from "../BaseComponent";
import LabelTextarea from '../LabelTextarea/LabelTextarea';
import DateEdit from '../DateEdit/DateEdit';
import Workers from '../Workers/Workers';

export default class NewNotReglamentWork extends BaseComponent {
    constructor() {
        super();
        this._defectType = new LabelTextarea({ label: 'Вид неисправности', required: true, rows: 3, placeholder: 'Неисправность...' });
        this._note = new LabelTextarea({ label: 'Произведенные работы', required: true, placeholder: 'Работы...' });
        this._dateOpen = new DateEdit({ label: 'Дата поступления заявки' });
        this._dateClose = new DateEdit({ label: 'Дата закрытия заявки ' });
        this._workers = new Workers();
    }

    render() {
        return newNotReglamentWorkTmp.call({}, {})
    }

    renderDOM() {
        const el = super.renderDOM();

        const defectTypeEl = this._defectType.create();
        defectTypeEl.classList.add('new-not-reglament-work__margin-top');

        const noteEl = this._note.create();
        noteEl.classList.add('new-not-reglament-work__margin-top');

        const dateOpenEl = this._dateOpen.create();
        dateOpenEl.classList.add('new-not-reglament-work__margin-top');

        const dateCloseEl = this._dateClose.create();
        dateCloseEl.classList.add('new-not-reglament-work__margin-top');

        const workersEl = this._workers.create();
        workersEl.classList.add('new-not-reglament-work__margin-top');

        el.append(dateOpenEl, dateCloseEl, defectTypeEl, noteEl, workersEl);
        return el
    }

    save() {
        const defectTypeData = this._defectType.save();
        const noteData = this._note.save();
        const workersData = this._workers.save();
        const dateOpenData = this._dateOpen.save();
        const dateCloseData = this._dateClose.save();

        if (!noteData || !workersData || !dateOpenData || !dateCloseData) {
            return null
        }

        const data = {
            defectType: defectTypeData.value,
            note: noteData.value,
            workers: workersData.value,
            dateOpen: dateOpenData.value,
            dateClose: dateCloseData.value,
        }

        return data
    }
}