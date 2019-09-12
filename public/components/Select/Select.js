import selectTmp from './Select.pug';
import './Select.scss';

export default class Select {
    /**
     * 
     * @param {Object} args - options: Array of args {text, value, chosen}, label: string
     */
    constructor(args) {
        this._label = args.label;
        this._options = args.options;
        this._el = null;
    }

    create() {
        this._el = this.renderDOM();
        this.afterRender();
        return this._el;
    }

    renderDOM() {
        const chosenOption = this._options.find((option) => option.chosen)
        const data = {
            label: this._label,
            options: this._options,
            chosenOption: chosenOption,
        }

        const html = selectTmp.call({}, {data});
        const buffer = document.createElement('div');
        buffer.insertAdjacentHTML('afterbegin', html);
        return buffer.firstElementChild;
    }

    getSelectedData() {
        return this._el.querySelector('.select__option-chosen-js').attributes['value'].value
    }

    afterRender() {
        const selectButton = this._el.querySelector('.select__button');
        selectButton.addEventListener('click', (e) => {
            e.preventDefault();
            const list = this._el.querySelector('.select__list');
            const icon = this._el.querySelector('.select__icon');

            if (list.classList.contains('select__list-closed')) {
                list.classList.remove('select__list-closed');
                list.classList.add('select__list-opened');
                this._el.classList.remove('select-closed');
                this._el.classList.add('select-opened');
                icon.classList.remove('select__icon-closed');
                icon.classList.add('select__icon-opened');
            } else {
                list.classList.add('select__list-closed');
                list.classList.remove('select__list-opened');
                this._el.classList.add('select-closed');
                this._el.classList.remove('select-opened');
                icon.classList.add('select__icon-closed');
                icon.classList.remove('select__icon-opened');
            }
        })

        const chooseOption = (e) => {
            e.preventDefault();
            const chosenOption = this._el.querySelector('.select__option-chosen-js');
            chosenOption.classList.remove('select__option-chosen-js');
            selectButton.textContent = e.target.textContent;
            e.target.classList.add('select__option-chosen-js');
            const list = this._el.querySelector('.select__list');
            list.classList.add('select__list-closed');
            list.classList.remove('select__list-opened');
            this._el.classList.add('select-closed');
            this._el.classList.remove('select-opened');
            const icon = this._el.querySelector('.select__icon');
            icon.classList.add('select__icon-closed');
            icon.classList.remove('select__icon-opened');
        };

        const options = this._el.querySelectorAll('.select__option');
        options.forEach((option) => {
            option.addEventListener('click', (e) => {
                chooseOption.bind(this)(e)
            });
        })
    }
}