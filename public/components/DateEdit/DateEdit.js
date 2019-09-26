import dateEditTmp from './DateEdit.pug';
import './DateEdit.scss';
import DateLabel from '../DateLabel/DateLabel';
import InputMsg from '../InputMsg/InputMsg';

export default class DateEdit extends DateLabel {
    constructor({ label = 'Дата и время проведения' }) {
        super({});
        this._label = label;
        this._date = new Date(Date.now());
        this._msgError = new InputMsg({ type: 'error', msg: 'Введите корректную дату и время!' })
    }

    render() {
        const data = {
            label: this._label,
            date: this.getMaskDate(this._date),
            time: this.getMaskTime(this._date),
        }

        return dateEditTmp.call({}, { data })
    }

    afterRender() {
        const dateEl = this.el.querySelector('.date-edit__date');
        dateEl.onkeydown = (e) => e.target.value.length <= e.target.maxLength && (
            !!e.key.match('[0-9]') || 
            e.key == 'ArrowLeft' ||
            e.key == 'ArrowRight' ||
            e.key == 'Delete' ||
            e.key == 'Backspace'
        );

        dateEl.onkeyup = (e) => {
            console.log(e.target)
            if (!e.target.reportValidity()) {
                const msgEl = this.el.querySelector('.date-edit__msg');
                if (msgEl) {
                    msgEl.style['display'] = 'unset';
                }
            }
            const mask = '00.00.0000';
            let newValue = '';
            [].forEach.call(e.target.value, (c, i) => {
                if (mask[i] === '0') {
                    !+c ? newValue += '0' : newValue += c;
                } else {
                    newValue += mask[i];
                }
            });

            e.target.value = newValue;

            if (e.target.value.length === 2 || e.target.value.length === 5) {
                e.target.value += '.';
            }
        };

        const timeEl = this.el.querySelector('.date-edit__time');
        timeEl.onkeydown = (e) => e.target.value.length <= e.target.maxLength && (
            !!e.key.match('[0-9]') || 
            e.key == 'ArrowLeft' ||
            e.key == 'ArrowRight' ||
            e.key == 'Delete' ||
            e.key == 'Backspace'
        );

        timeEl.onkeyup = (e) => {
            const mask = '00:00';
            let newValue = '';
            [].forEach.call(e.target.value, (c, i) => {
                if (mask[i] === '0') {
                    !+c ? newValue += '0' : newValue += c;
                } else {
                    newValue += mask[i];
                }
            });

            e.target.value = newValue;

            if (e.target.value.length === 2) {
                e.target.value += ':';
            }
        }
    }

    clearMsg() {
        this._msgError.el && this._msgError.hide()
    }

    renderError() {
        const msgErrorEl = this._msgError.create();
        msgErrorEl.classList.add('date-edit__msg');
        msgErrorEl.style['display'] = 'unset';
        this.el.append(msgErrorEl);
    }

    save() {
        this.clearMsg();
        const dateEl = this.el.querySelector('.date-edit__date');
        const timeEl = this.el.querySelector('.date-edit__time');
        const date = dateEl.value;
        const time = timeEl.value;

        if (!dateEl.reportValidity() || !timeEl.reportValidity()) {
            this.renderError();
            return null
        }

        const dateData = date.match('([0-9]{2}).([0-9]{2}).([0-9]{4})');
        if (!dateData) {
            this.renderError();
            return null
        }

        const [, day, month, year] = dateData;

        const timeDate = time.match('([0-9]{2}):([0-9]{2})');
        if (!timeDate) {
            this.renderError();
            return null
        }

        const [, hours, minutes] = timeDate;

        if (!day || !month || !year || !hours || !minutes) {
            this.renderError();
            return null;
        }

        const dateObj = new Date(+year, +month - 1, +day, +hours, +minutes);
        const minDate = new Date('2000-01-01');
        if (!dateObj.getTime() || dateObj < minDate) {
            this.renderError();
            return null
        }

        return { value: dateObj.getTime() }
    }
}