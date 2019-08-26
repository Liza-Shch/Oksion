import itemTmp from './Item.pug';
import './Item.scss';

export default class Item {
    constructor(args) {
        this.type = args.type;
        this.isWork = args.isWork;
        this.district = args.district;
        this.address = args.address;
        this._el = null;
    }

    create() {
        this._el = this.renderDOM();
        return this._el;
    }

    renderDOM() {
        const data = {
            type: this.type,
            isWork: this.isWork,
            district: this.district,
            address: this.address 
        }

        const html = itemTmp.call({}, {data});
        const buffer = document.createElement('div');
        buffer.insertAdjacentHTML('afterbegin', html);
        return buffer.firstElementChild;
    }
}