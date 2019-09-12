import itemsTmp from './Items.pug';
import './Items.scss';
import Item from '../Item/Item';
import ItemTypes from '../../const/ItemTypes';
import District from '../../const/District';
import Store from "../../scripts/Store";
import EventBus from "../../scripts/EventBus";
import PageEvents from "../../events/PageEvents";

export default class Items {
    constructor(args) {
        this._el = null;
        this._items = args.items;
        this._order = args.order || 'fromPionToPuon';
    }

    create() {
        this._prepareArgs();
        this._el = this.renderDOM();
        return this._el;
    }

    _prepareArgs() {
        this._items = this._items.map((item) => {
            item.type = Object.assign({}, ItemTypes.find((type) => type.value == item.type)); 
            return item
        })
        .map((item) => {
            item.district = Object.assign({}, District.find((district) => district.value == item.district));
            return item
        });
        console.log("prepare", this._items);
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

    _renderFillAll(el) {
        const firstContainer = el.querySelector('.items__col-first');
        const secondContainer = el.querySelector('.items__col-second');
        const size = this._items.length;
        let i = 0;
        while (i < size) {
            const first = new Item(this._items[i]);
            const firstEl = first.create();
            firstContainer.appendChild(firstEl);
            i++;
            if (i < size) {
                const second = new Item(this._items[i]);
                const secondEl = second.create();
                secondContainer.appendChild(secondEl);
            }
        }

        return el;
    }

    renderDOM() {
        const html = itemsTmp.call({}, {});
        const buffer = document.createElement('div');
        buffer.insertAdjacentHTML('afterbegin', html);
        let itemsEl = buffer.firstElementChild;

        if (this._order == 'fromPionToPuon') {
            itemsEl = this._renderByType(itemsEl);
        } else if (this._order == 'fillAll') {
            itemsEl = this._renderFillAll(itemsEl);
        }

        return itemsEl;
    }

    update(args) {
        console.log("UPDATE");
        this._order = args.order;
        this._items = args.items;
        this._el = this.create();
        return this._el;
    }
}