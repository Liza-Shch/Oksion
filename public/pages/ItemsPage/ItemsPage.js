import './ItemsPage.scss';
import ItemsStatistics from '../../components/ItemsStatistics/ItemsStatistics';
import ItemsFilter from '../../components/ItemsFilter/ItemsFilter';
import Title from '../../components/Title/Title';
import Items from '../../components/Items/Items';

export default class ItemsPage {
    constructor(args) {
        this._el = args.el;
        this._stat = {
            work: 123,
            notWork: 23,
            percent: 87
        };
        this._items = args.items;
        console.log("ItemsPage", args.items);
    }

    render() {
        this._el.classList.add('main-items');

        const statistics = new ItemsStatistics(this._stat);
        const statisticsEl = statistics.renderDOM();
        statisticsEl.style['grid-area'] = 'stat';

        this._el.appendChild(statisticsEl);

        const title = new Title({text: 'Объекты'});
        const titleEl = title.renderDOM();
        titleEl.style['grid-area'] = 'title';

        const filter = new ItemsFilter();
        const filterEl = filter.create();
        filterEl.style['grid-area'] = 'filter';

        const items = new Items({items: this._items, order: 'fromPionToPuon'});
        const itemsEl = items.create();
        itemsEl.style['grid-area'] = 'main';


        this._el.append(statisticsEl, titleEl, filterEl, itemsEl);

        console.log("EL", this._el);
        return this._el;
    }
}