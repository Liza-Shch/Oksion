import objectsFilterTmp from './ObjectsFilter.pug';
import './ObjectsFilter.scss';
import Select from '../Select/Select';
import ObjectTypesSelect from '../../const/ObjectTypesSelect';
import DistrictSelect from '../../const/DistrictSelect';
import Button from '../Button/Button';
import { format } from 'path';

export default class ObjectsFilter {
    constructor() {
        this._el = null;
    }

    create() {
        this._el = this.renderDOM();
        this.afterRender();
        return this._el;
    }

    renderDOM() {
        const html = objectsFilterTmp.call({}, {});
        const buffer = document.createElement('div');
        buffer.insertAdjacentHTML('afterbegin', html);
        this._el = buffer.firstElementChild;
        
        const typeSelectArgs = ObjectTypesSelect;
        const typeSelect = new Select({label: 'Тип объекта', options: typeSelectArgs});
        const typeSelectEl = typeSelect.create();
        typeSelectEl.classList.add('object-type-select-js');

        const districtSelectArgs = DistrictSelect;
        const districtSelect = new Select({label: 'Округ', options: districtSelectArgs});
        const districtSelectEl = districtSelect.create();
        districtSelectEl.classList.add('district-select-js');

        const buttonArgs = {
            type: 'filter',
            text: 'Найти'
        }

        const button = new Button(buttonArgs);
        const buttonEl = button.create();

        this._el.append(typeSelectEl, districtSelectEl, buttonEl);
        return this._el;
    }

    afterRender() {
        this._el.onsubmit = (e) => {
            e.preventDefault();
            const objectType = this._el.querySelector('.object-type-select-js');
            const objectTypeChosen = objectType.querySelector('.select__option-chosen-js');
            const objectTypeValue = objectTypeChosen.attributes.value.value;

            const district = this._el.querySelector('.district-select-js');
            const districtChosen = district.querySelector('.select__option-chosen-js');
            const districtValue = districtChosen.attributes.value.value;

            const data = {
                objectType: objectTypeValue,
                district: districtValue
            };

            console.log('DATA', data);
        }
    }
}