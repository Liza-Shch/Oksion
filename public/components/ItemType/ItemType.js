import itemTypeTmp from './ItemType.pug';
import '../../mixins/item-type/item-type.scss';
import BaseComponent from '../BaseComponent';
import EventBus from '../../scripts/EventBus';
import PageEvents from '../../events/PageEvents';

export default class ItemType extends BaseComponent {
    constructor(args) {
        super()
        this.type = args.type;
        EventBus.on(PageEvents.UPDATE_ITEM_TYPE, this.update.bind(this));
    }

    render() {
        const data = {
            type: this.type.value,
            text: this.type.text
        }

        return itemTypeTmp.call({}, { data })
    }

    update({ type }) {
        this.type = type;
        const newEl = this.renderDOM();
        this.el.innerHTML = newEl.innerHTML;
        this.el.classList = newEl.classList;
    }
}