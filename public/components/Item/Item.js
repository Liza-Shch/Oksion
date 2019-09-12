import itemTmp from './Item.pug';
import './Item.scss';
import '../../mixins/item-type/item-type.scss';
import EventBus from '../../scripts/EventBus';
import PageEvents from '../../events/PageEvents';

export default class Item {
    constructor(args) {
        this.id = args.id;
        this.type = args.type;
        this.isWork = args.isWork;
        this.district = args.district;
        this.address = args.address;
        this._el = null;
    }

    create() {
        this._el = this.renderDOM();
        this.afterRender()
        return this._el;
    }

    renderDOM() {
        const data = {
            id: this.id,
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

    afterRender() {
        // this._el.addEventListener('click', (e) => {
        //     console.log('CLICK')
        //     e.preventDefault();
        //     EventBus.emit(PageEvents.CREATE_ITEM_PAGE, `/items/${this.id}`)
        //     return false
        // })
    }
}