import itemTypeTmp from './ItemType.pug';
import '../../mixins/item-type/item-type.scss';
import BaseComponent from '../BaseComponent';

export default class ItemType extends BaseComponent {
    constructor(args) {
        super()
        this.type = args.type;
    }

    render() {
        const data = {
            type: this.type.value,
            text: this.type.text
        }

        return itemTypeTmp.call({}, { data })
    }
}