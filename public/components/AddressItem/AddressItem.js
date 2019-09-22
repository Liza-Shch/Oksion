import addressTmp from './AddressItem.pug';
import BaseComponent from '../BaseComponent';
import EventBus from '../../scripts/EventBus';
import PageEvents from '../../events/PageEvents';

export default class AddressItem extends BaseComponent {
    constructor({ address }) {
        super()
        this.address = address;
        EventBus.on(PageEvents.UPDATE_ITEM_ADDRESS, this.update.bind(this))
    }

    render() {
        const data = {
            text: this.address,
        }

        return addressTmp.call({}, { data })
    }

    update({ address }) {
        this.address = address;
        const newEl = this.renderDOM();
        this.el.innerHTML = newEl.innerHTML;
        this.el.classList = newEl.classList;
    }
}