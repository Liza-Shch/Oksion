import dateTmp from './DateLabel.pug';
import './DateLabel.scss';
import BaseComponent from "../BaseComponent";

export default class DateLabel extends BaseComponent {
    constructor({ date, label }) {
        super();
        this._date = new Date(date);
    }

    render() {
        const data = {
            date: this.getMaskDate(this._date),
            time: this.getMaskTime(this._date)
        }

        return dateTmp.call({}, { data })
    }

    getMaskDate(date) {
        const month = date.getMonth() + 1;
        const newMonth = month < 10 ? '0' + month : month;

        const days = date.getDate();
        const newDays = days < 10 ? '0' + days : days;
        return newDays + '.' + newMonth + '.' + date.getFullYear();

    }

    getMaskTime(time) {
        const hours = time.getHours();
        const newHours = hours < 10 ? '0' + hours : hours;

        const minutes = time.getMinutes();
        const newMinutes = minutes < 10 ? '0' + minutes : minutes;

        return newHours + ':' + newMinutes;
    }
}