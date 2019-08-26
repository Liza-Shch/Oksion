import itemsstatisticsTmp from './ItemsStatistics.pug';
import './ItemsStatistics.scss';
import '../../mixins/circle/circle.scss';

export default class ItemsStatistics {
    constructor(args) {
        this._work = args.work;
        this._notWork = args.notWork;
        this._percent = args.percent;
    }

    render() {}

    renderDOM() {
        const data = {
            work: this._work,
            notWork: this._notWork,
            percent: this._percent
        }

        const html = itemsstatisticsTmp.call({}, {data});
        const buffer = document.createElement('div');
        buffer.insertAdjacentHTML('afterbegin', html);
        return buffer.firstElementChild;
    }
}