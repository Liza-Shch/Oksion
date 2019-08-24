import './ObjectsPage.scss';
import ObjectsStatistics from '../../components/ObjectsStatistics/ObjectsStatistics';
import ObjectsFilter from '../../components/ObjectsFilter/ObjectsFilter';
import Title from '../../components/Title/Title';
import Items from '../../components/Items/Items';

export default class ObjectsPage {
    constructor(args) {
        this._el = args.el;
        this._stat = {
            work: 123,
            notWork: 23,
            percent: 87
        };
        console.log("ObjectsPage");
    }

    render() {
        this._el.classList.add('main-objects');

        const statistics = new ObjectsStatistics(this._stat);
        const statisticsEl = statistics.renderDOM();
        statisticsEl.style['grid-area'] = 'stat';

        this._el.appendChild(statisticsEl);

        const title = new Title({text: 'Объекты'});
        const titleEl = title.renderDOM();
        titleEl.style['grid-area'] = 'title';

        const filter = new ObjectsFilter();
        const filterEl = filter.create();
        filterEl.style['grid-area'] = 'filter';

        const args = [
            {
                type: 'pion',
                isWork: true,
                district: 'northern',
                address: 'ул. Б. Декабрьская, д. 3 стр. 1 и 2, (ТЦ “Электроника на Пресне”)'
            },
            {
                type: 'pion',
                isWork: false,
                district: 'central',
                address: 'ул. Золоторожский вал, д. 42 (ТЦ "ГЕМ")'
            },
            {
                type: 'puon',
                isWork: false,
                district: 'northeastern',
                address: 'ул. Б. Декабрьская, д. 3 стр. 1 и 2, (ТЦ “Электроника на Пресне”)'
            },
            {
                type: 'pion',
                isWork: true,
                district: 'northern',
                address: 'ул. Б. Декабрьская, д. 3 стр. 1 и 2, (ТЦ “Электроника на Пресне”)'
            },
            {
                type: 'pion',
                isWork: true,
                district: 'central',
                address: 'ул. Золоторожский вал, д. 42 (ТЦ "ГЕМ")'
            },
            {
                type: 'puon',
                isWork: true,
                district: 'eastern',
                address: 'ул. Б. Декабрьская, д. 3 стр. 1 и 2, (ТЦ “Электроника на Пресне”)'
            },
        ]
        const items = new Items({items: args, order: 'fromPionToPuon'});
        const itemsEl = items.create();
        itemsEl.style['grid-area'] = 'main';


        this._el.append(statisticsEl, titleEl, filterEl, itemsEl);

        return this._el;
    }
}