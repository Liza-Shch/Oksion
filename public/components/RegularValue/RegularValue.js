import regularValueTmp from './RegularValue.pug';
import './RegularValue.scss';
import BaseComponent from "../BaseComponent";
import ButtonEdit from "../ButtonEdit/ButtonEdit";

export default class RegularValue extends BaseComponent {
    constructor({ currentValue }) {
        super();
        this._currentValue = currentValue;
        this._buttonInc = new ButtonEdit({ action: this.inc.bind(this), type: 'inc' });
        this._buttonDec = new ButtonEdit({ action: this.dec.bind(this), type: 'dec' });
    }

    render() {
        const data = {
            value: this._currentValue,
        }

        return regularValueTmp.call({}, { data })
    }

    create() {
        this.el = this.renderDOM();
        this.el.querySelector('.regular-value__inc').append(this._buttonInc.create());
        this.el.querySelector('.regular-value__dec').append(this._buttonDec.create());
        return this.el;
    }

    inc(e) {
        e.stopPropagation();
        if (this._currentValue === 1000) {
            return
        }

        this.el.querySelector('.regular-value__value-js').textContent = ++this._currentValue;
    }

    dec(e) {
        e.stopPropagation();
        if (this._currentValue === 1) {
            return
        }

        this.el.querySelector('.regular-value__value-js').textContent = --this._currentValue;
    }

    getValue() {
        return this._currentValue;
    }
}