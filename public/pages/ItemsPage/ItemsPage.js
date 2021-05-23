import './ItemsPage.scss';
import ItemsStatistics from '../../components/ItemsStatistics/ItemsStatistics';
import ItemsFilter from '../../components/ItemsFilter/ItemsFilter';
import Title from '../../components/Title/Title';
import Items from '../../components/Items/Items';
import Store from '../../scripts/Store';
import EventBus from "../../scripts/EventBus";
import PageEvents from '../../events/PageEvents';

export default class ItemsPage {
    constructor({ el, items }) {
        this.el = el;
        this._stat = {
            work: 123,
            notWork: 23,
            percent: 84
        };
        this._items = items;
        this._itemsEl = null;
        console.log("ItemsPage", items);
        EventBus.on(PageEvents.UPDATE_ITEMS, this.updateItems.bind(this));
    }

    render() {
        this.el.classList.add('main-items');

        const statistics = new ItemsStatistics(this._stat);
        const statisticsEl = statistics.renderDOM();
        statisticsEl.style['grid-area'] = 'stat';

        this.el.appendChild(statisticsEl);

        const title = new Title({text: 'Объекты'});
        const titleEl = title.renderDOM();
        titleEl.style['grid-area'] = 'title';

        const filter = new ItemsFilter();
        const filterEl = filter.create();
        filterEl.style['grid-area'] = 'filter';

        const items = new Items({ items: this._items });
        const itemsEl = items.create();
        itemsEl.style['grid-area'] = 'main';
        this._itemsEl = items;

        this.el.append(statisticsEl, titleEl, filterEl, itemsEl);

        console.log("EL", this.el);
        return this.el;
    }

    updateItems(args) {
        this._items = Store.getItems();
        args.items = this._items;
        console.log("UPDATE", this._items);
        const newItems = this._itemsEl.update(args);
        console.log("newItems", newItems);
        this.el.querySelector('.items').innerHTML = newItems.innerHTML;
    }
}