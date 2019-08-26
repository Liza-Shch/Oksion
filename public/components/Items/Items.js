import itemsTmp from './Items.pug';
import './Items.scss';
import Item from '../Item/Item';
import ItemTypes from '../../const/ItemTypes';
import District from '../../const/District';

export default class Items {
    constructor(args) {
        this._el = null;
        this._items = args.items;
        this._order = args.order;
    }

    create() {
        this._prepareArgs();
        this._el = this.renderDOM();
        return this._el;
    }

    _prepareArgs() {
        for (let key in this._items) {
            this._items[key].type = ItemTypes.find((type) => type.value == this._items[key].type);
            this._items[key].district = District.find((district) => district.value == this._items[key].district);
        }
        console.log("Prepare Args", this._items);
    }

    /**
     * Create order repeat(pion, puon)
     */
    _renderByType(el) {
        const pions = [];
        const puons = [];
        for (let key in this._items) {
            if (this._items[key].type.value == 'pion') {
                pions.push(this._items[key])
            }

            if (this._items[key].type.value == 'puon') {
                puons.push(this._items[key])
            }
        }
        
        console.log(pions, puons);
        const pionsContainer = el.querySelector('.items__col-first');
        const puonsContainer = el.querySelector('.items__col-second');
        pions.forEach((_pion) => {
            const pion = new Item(_pion);
            const pionEl = pion.create();
            console.log("PION", pionEl);
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

        console.log(itemsEl);
        if (this._order == 'fromPionToPuon') {
            itemsEl = this._renderByType(itemsEl);
        }

        return itemsEl;
    }
}