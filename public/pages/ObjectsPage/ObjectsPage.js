import './ObjectsPage.scss';
import ObjectsStatistics from '../../components/ObjectsStatistics/ObjectsStatistics';
import ObjectsFilter from '../../components/ObjectsFilter/ObjectsFilter';
import Title from '../../components/Title/Title';

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

        this._el.append(statisticsEl, titleEl, filterEl);

        return this._el;
    }
}