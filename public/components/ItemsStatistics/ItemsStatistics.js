import itemsstatisticsTmp from './ItemsStatistics.pug';
import './ItemsStatistics.scss';
import '../../mixins/circle/circle.scss';
import BaseComponent from '../BaseComponent';

export default class ItemsStatistics extends BaseComponent {
    constructor(args) {
        super()
        this._work = args.work;
        this._notWork = args.notWork;
        this._percent = args.percent;
    }

    render() {
        const data = {
            work: this._work,
            notWork: this._notWork,
            percent: this._percent
        }

        return itemsstatisticsTmp.call({}, {data});
    }
}