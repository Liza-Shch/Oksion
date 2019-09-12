import itemTypeTmp from './ItemType.pug';
import '../../mixins/item-type/item-type.scss';

export default class ItemType {
    constructor(args) {
        this.type = args.type;
        this._el = null;
    }

    create() {
        this._el = this.renderDOM();
        return this._el;
    }

    render() {
        const data = {
            type: this.type.value,
            text: this.type.text
        }

        return itemTypeTmp.call({}, { data })
    }

    renderDOM() {
        const html = this.render();
        const buffer = document.createElement('div');
        buffer.insertAdjacentHTML('afterbegin', html);
        return buffer.firstElementChild
    }
}