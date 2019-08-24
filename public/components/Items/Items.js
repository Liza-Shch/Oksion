import itemsTmp from './Items.pug';
import './Items.scss';
import Item from '../Item/Item';
import ObjectTypes from '../../const/ObjectTypes';
import District from '../../const/District';

export default class Items {
    constructor(args) {
        this._el = null;
        this._items = args.items;
        this._order = args.order;
    }

    create() {
        this._prepareArgs();
        console.log(this._items);
        this._el = this.renderDOM();
        return this._el;
    }

    _prepareArgs() {
        this._items.map((item) => {
            item.type = ObjectTypes.find((type) => type.value == item.type);
            item.district = District.find((district) => district.value == item.district);
        })
    }

    /**
     * Create order repeat(pion, puon)
     */
    _renderByType(el) {
        const pions = this._items.filter((item) => item.type.value == 'pion');
        const puons = this._items.filter((item) => item.type.value == 'puon');
        
        const pionsContainer = el.querySelector('.items__col-first');
        const puonsContainer = el.querySelector('.items__col-second');
        pions.forEach((_pion) => {
            const pion = new Item(_pion);
            const pionEl = pion.create();
            pionsContainer.appendChild(pionEl);
        });

        puons.forEach((_puon) => {
            const puon = new Item(_puon);
            const puonEl = puon.create();
            puonsContainer.appendChild(puonEl);
        });

        return el;
    }

    renderDOM() {
        const html = itemsTmp.call({}, {});
        const buffer = document.createElement('div');
        buffer.insertAdjacentHTML('afterbegin', html);
        let itemsEl = buffer.firstElementChild;

        if (this._order == 'fromPionToPuon') {
            itemsEl = this._renderByType(itemsEl);
        }

        return itemsEl;
    }
}