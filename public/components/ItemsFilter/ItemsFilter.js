import itemsFilterTmp from './ItemsFilter.pug';
import './ItemsFilter.scss';
import Select from '../Select/Select';
import ItemTypesSelect from '../../const/ItemTypesSelect';
import DistrictSelect from '../../const/DistrictSelect';
import Button from '../Button/Button';
import EventBus from '../../scripts/EventBus';
import PageEvents from '../../events/PageEvents';
import APIEvents from '../../events/APIEvents';
import ItemTypes from '../../const/ItemTypes';

export default class ItemsFilter {
    constructor() {
        this._el = null;
    }

    create() {
        this._el = this.renderDOM();
        this.afterRender();
        return this._el;
    }

    renderDOM() {
        const html = itemsFilterTmp.call({}, {});
        const buffer = document.createElement('div');
        buffer.insertAdjacentHTML('afterbegin', html);
        this._el = buffer.firstElementChild;
        
        const typeSelectArgs = ItemTypesSelect;
        const typeSelect = new Select({label: 'Тип объекта', options: typeSelectArgs});
        const typeSelectEl = typeSelect.create();
        typeSelectEl.classList.add('item-type-select-js');

        const districtSelectArgs = DistrictSelect;
        const districtSelect = new Select({label: 'Округ', options: districtSelectArgs});
        const districtSelectEl = districtSelect.create();
        districtSelectEl.classList.add('item-district-select-js');

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
            const objectType = this._el.querySelector('.item-type-select-js');
            const objectTypeChosen = objectType.querySelector('.select__option-chosen-js');
            const objectTypeValue = objectTypeChosen.attributes.value.value;

            const district = this._el.querySelector('.item-district-select-js');
            const districtChosen = district.querySelector('.select__option-chosen-js');
            const districtValue = districtChosen.attributes.value.value;

            const data = {
                type: objectTypeValue,
                district: districtValue
            };

            const order = data.type == 'any' ? 'fromPionToPuon' : 'fillAll';
            const args = {
                cond: data,
                event: {
                    success: [
                        {event: PageEvents.UPDATE_ITEMS, args: {order: order}}
                    ]
                }
            }

            EventBus.emit(APIEvents.GET_ITEMS, args)
        }
    }
}