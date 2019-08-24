import itemTmp from './Item.pug';
import './Item.scss';

export default class Item {
    constructor(args) {
        this._type = args.type;
        this._isWork = args.isWork;
        this._district = args.district;
        this._address = args.address;
        this._el = null;
    }

    create() {
        this._el = this.renderDOM();
        return this._el;
    }

    renderDOM() {
        const data = {
            type: this._type,
            isWork: this._isWork,
            district: this._district,
            address: this._address 
        }

        console.log(data);
        const html = itemTmp.call({}, {data})
        const buffer = document.createElement('div');
        buffer.insertAdjacentHTML('afterbegin', html);
        return buffer.firstElementChild;
    }
}