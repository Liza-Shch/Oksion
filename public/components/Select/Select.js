import selectTmp from './Select.pug';
import './Select.scss';
import BaseComponent from '../BaseComponent';

export default class Select extends BaseComponent {
    /**
     * 
     * @param {Object} options - options: Array of args {text, value, chosen}
     * @param {String} label - label
     */
    constructor({ label, options, onChange = null }) {
        super()
        this._label = label;
        this._options = options;
        this._onChange = onChange;
    }

    render() {
        const chosenOption = this._options.find((option) => option.chosen)
        const data = {
            label: this._label,
            options: this._options,
            chosenOption: chosenOption,
        }

        return selectTmp.call({}, {data});
    }

    getSelectedData() {
        const optionSelected = this._options.find((option) => option.chosen);
        return this.el && this.el.querySelector('.select__option-chosen-js').attributes['value'].value || optionSelected.value
    }

    afterRender() {
        const selectButton = this.el.querySelector('.select__button');
        selectButton.addEventListener('click', (e) => {
            e.preventDefault();
            const list = this.el.querySelector('.select__list');
            const icon = this.el.querySelector('.select__icon');

            if (list.classList.contains('select__list-closed')) {
                list.classList.remove('select__list-closed');
                list.classList.add('select__list-opened');
                this.el.classList.remove('select-closed');
                this.el.classList.add('select-opened');
                icon.classList.remove('select__icon-closed');
                icon.classList.add('select__icon-opened');
            } else {
                list.classList.add('select__list-closed');
                list.classList.remove('select__list-opened');
                this.el.classList.add('select-closed');
                this.el.classList.remove('select-opened');
                icon.classList.add('select__icon-closed');
                icon.classList.remove('select__icon-opened');
            }
        })

        const chooseOption = (e) => {
            e.preventDefault();
            const chosenOption = this.el.querySelector('.select__option-chosen-js');
            chosenOption.classList.remove('select__option-chosen-js');
            selectButton.textContent = e.target.textContent;
            e.target.classList.add('select__option-chosen-js');
            const list = this.el.querySelector('.select__list');
            list.classList.add('select__list-closed');
            list.classList.remove('select__list-opened');
            this.el.classList.add('select-closed');
            this.el.classList.remove('select-opened');
            const icon = this.el.querySelector('.select__icon');
            icon.classList.add('select__icon-closed');
            icon.classList.remove('select__icon-opened');
        };

        const options = this.el.querySelectorAll('.select__option');
        options.forEach((option) => {
            option.addEventListener('click', (e) => {
                chooseOption.bind(this)(e);
                this._onChange && this._onChange.bind(this)(e);
            });
        })
    }
}