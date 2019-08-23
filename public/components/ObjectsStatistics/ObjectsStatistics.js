import objectsstatisticsTmp from './ObjectsStatistics.pug';
import './ObjectsStatistics.scss';
import '../../mixins/circle/circle.scss';

export default class ObjectsStatistics {
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

        const html = objectsstatisticsTmp.call({}, {data});
        const buffer = document.createElement('div');
        buffer.insertAdjacentHTML('afterbegin', html);
        return buffer.firstElementChild;
    }
}